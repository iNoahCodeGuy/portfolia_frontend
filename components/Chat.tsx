"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { RotateCcw } from "lucide-react";
import { Message } from "@/types/chat";
import { sendMessage } from "@/lib/api";
import WelcomeScreen from "./WelcomeScreen";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import PortfoliaMark from "./PortfoliaMark";
import { ContactFormData, detectForm } from "./ContactForm";
import { CrushFormData } from "./CrushForm";

// Menu button texts that should be sent as role to the backend
const MENU_BUTTONS = new Set([
  "Learn more about Noah",
  "See what Noah has built",
  "How I relate to Enterprise AI",
  "Confess a crush",
]);

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showWelcome = messages.length === 0;

  // True when the last assistant message contains a form that hasn't been submitted yet
  const formActive = useMemo(() => {
    if (messages.length === 0) return false;
    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return false;
    // Prefer the backend's structured signal; fall back to text detection
    // for messages that predate the form field.
    if (last.form !== undefined) return last.form !== null;
    return detectForm(last.content).formType !== null;
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const role = MENU_BUTTONS.has(content) ? content : undefined;
        const result = await sendMessage(content, sessionId, role);
        setSessionId(result.sessionId);

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: result.response,
          form: result.form,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Something went wrong. Try again in a moment.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId],
  );

  const handleContactSubmit = useCallback(
    (data: ContactFormData) => {
      const formatted = [
        `Name: ${data.name}`,
        data.phone ? `Number: ${data.phone}` : null,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : null,
        data.additional ? `Additional information: ${data.additional}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      handleSendMessage(formatted);
    },
    [handleSendMessage],
  );

  const handleCrushSubmit = useCallback(
    (data: CrushFormData) => {
      const formatted = [
        `Name: ${data.name}`,
        `Number or social: ${data.contact}`,
        `Message for Noah: ${data.message}`,
      ].join("\n");

      handleSendMessage(formatted);
    },
    [handleSendMessage],
  );

  const handleReset = () => {
    setMessages([]);
    setSessionId(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with identity + reset */}
      {!showWelcome && (
        <header className="flex items-center justify-between border-b border-chat-border/60 bg-chat-bg/80 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2.5">
            <PortfoliaMark size="sm" />
            <div className="leading-tight">
              <span className="block text-sm font-medium text-zinc-100">Portfolia</span>
              <span className="block text-[11px] text-zinc-500">
                Noah&apos;s AI portfolio
              </span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-lg border border-transparent px-2.5 py-1.5
                       text-xs text-zinc-400 transition-colors hover:border-chat-border
                       hover:bg-chat-surface hover:text-zinc-100"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
            Start over
          </button>
        </header>
      )}

      {/* Chat messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll" aria-live="polite">
        {showWelcome ? (
          <WelcomeScreen onSelectOption={handleSendMessage} />
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-6 flex flex-col gap-6">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onContactSubmit={handleContactSubmit}
                onCrushSubmit={handleCrushSubmit}
              />
            ))}
            {isLoading && (
              <div className="anim-fade-up flex gap-3">
                <PortfoliaMark />
                <div className="pt-0.5">
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                    Portfolia
                  </span>
                  <span className="flex h-4 items-center gap-1" aria-label="Portfolia is typing">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input bar */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isLoading || formActive}
        placeholder={formActive ? "Please fill out the form above first" : undefined}
      />
    </div>
  );
}
