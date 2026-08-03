/**
 * Portfolia's monogram — the one visual identity mark, shared by the chat
 * header, assistant messages, and the typing indicator so they read as the
 * same speaker.
 */
export default function PortfoliaMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-6 w-6 text-[11px]" : "h-7 w-7 text-[13px]";
  return (
    <span
      aria-hidden="true"
      className={`${box} flex shrink-0 select-none items-center justify-center rounded-lg
                  bg-gradient-to-br from-chat-primary to-chat-secondary
                  font-display italic font-semibold text-white shadow-[0_0_12px_rgba(139,92,246,0.35)]`}
    >
      P
    </span>
  );
}
