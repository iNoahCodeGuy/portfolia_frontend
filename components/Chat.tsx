"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "@/types/chat";
import { sendMessage } from "@/lib/api";
import WelcomeScreen from "./WelcomeScreen";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { ContactFormData } from "./ContactForm";
import { CrushFormData } from "./CrushForm";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showWelcome = messages.length === 0;

  // Scroll to bottom when messages change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await sendMessage(content, sessionId);
      setSessionId(result.sessionId);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.response,
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
  };

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
    [sessionId],
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
    [sessionId],
  );

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll">
        {showWelcome ? (
          <WelcomeScreen onSelectOption={handleSendMessage} />
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-6 flex flex-col gap-4">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onContactSubmit={handleContactSubmit}
                onCrushSubmit={handleCrushSubmit}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-zinc-400">
                  <span className="block text-xs font-medium text-zinc-400 mb-1">
                    Portfolia
                  </span>
                  <span className="inline-flex gap-1">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse [animation-delay:200ms]">.</span>
                    <span className="animate-pulse [animation-delay:400ms]">.</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input bar */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
