"use client";

import ReactMarkdown from "react-markdown";
import { Message } from "@/types/chat";
import ContactForm, { detectContactForm, ContactFormData } from "./ContactForm";

interface MessageBubbleProps {
  message: Message;
  onContactSubmit?: (data: ContactFormData) => void;
}

export default function MessageBubble({ message, onContactSubmit }: MessageBubbleProps) {
  const isUser = message.role === "user";

  const { preamble, hasForm } = isUser
    ? { preamble: message.content, hasForm: false }
    : detectContactForm(message.content);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-zinc-800 text-zinc-100 rounded-bl-md"
          }`}
      >
        {!isUser && (
          <span className="block text-xs font-medium text-zinc-400 mb-1">
            Portfolia
          </span>
        )}
        {isUser ? (
          message.content
        ) : (
          <>
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline hover:text-blue-300"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {hasForm ? preamble : message.content}
            </ReactMarkdown>
            {hasForm && onContactSubmit && (
              <ContactForm onSubmit={onContactSubmit} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
