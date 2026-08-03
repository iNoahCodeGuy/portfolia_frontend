"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea. When empty, stay at the natural one-row height —
  // measuring scrollHeight at mount (before styles/fonts settle) can read a
  // bogus value that would otherwise stick until the user types.
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      if (input) {
        el.style.height = Math.min(el.scrollHeight, 160) + "px";
      }
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-chat-border/60 bg-chat-bg/80 px-4 pb-4 pt-3 backdrop-blur">
      <div className="mx-auto max-w-3xl">
        <div
          className="flex items-end gap-2 rounded-2xl border border-chat-border bg-chat-surface
                     px-3 py-2 transition-colors focus-within:border-chat-primary/50
                     focus-within:ring-1 focus-within:ring-chat-primary/30"
        >
          <textarea
            aria-label="Message Portfolia"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Ask Portfolia anything..."}
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent px-1.5 py-1.5 text-sm text-zinc-100
                       placeholder-zinc-500 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-chat-primary
                       text-white transition-all hover:bg-violet-400 disabled:opacity-30
                       disabled:hover:bg-chat-primary"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
        <p className="mt-2 hidden text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600 sm:block">
          Enter to send&nbsp;&middot;&nbsp;Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
}
