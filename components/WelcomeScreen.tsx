"use client";

import { UserRound, Blocks, Network, Heart, type LucideIcon } from "lucide-react";
import { MenuOption } from "@/types/chat";

// `message` is the exact string the backend routes on — display copy can
// change freely, these strings cannot.
const MENU_OPTIONS: (MenuOption & { description: string; icon: LucideIcon; iconClass: string })[] = [
  {
    label: "Learn more about Noah",
    message: "Learn more about Noah",
    description: "Career, background, and the through-line",
    icon: UserRound,
    iconClass: "text-chat-primary",
  },
  {
    label: "See what Noah has built",
    message: "See what Noah has built",
    description: "Seven shipped projects — including this one",
    icon: Blocks,
    iconClass: "text-chat-primary",
  },
  {
    label: "How I relate to Enterprise AI",
    message: "How I relate to Enterprise AI",
    description: "Pipeline patterns mapped to production",
    icon: Network,
    iconClass: "text-chat-primary",
  },
  {
    label: "Confess a crush",
    message: "Confess a crush",
    description: "Bold. There's a form for that.",
    icon: Heart,
    iconClass: "text-chat-secondary",
  },
];

interface WelcomeScreenProps {
  onSelectOption: (message: string) => void;
}

export default function WelcomeScreen({ onSelectOption }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-10 px-4 py-8">
      <div className="anim-fade-up max-w-xl text-center">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-500">
          Noah de la Calzada&nbsp;&middot;&nbsp;AI Portfolio
        </p>
        <h1 className="mb-5 bg-gradient-to-br from-zinc-50 via-zinc-200 to-violet-300 bg-clip-text font-display text-5xl italic text-transparent sm:text-7xl">
          Portfolia
        </h1>
        <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
          Noah&apos;s AI-powered portfolio assistant. I know about his projects,
          career, technical stack, and there&apos;s an MMA coaching story.
          Pick a lane or ask whatever you want.
        </p>
      </div>

      <div className="grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
        {MENU_OPTIONS.map((option, i) => {
          const Icon = option.icon;
          return (
            <button
              key={option.label}
              onClick={() => onSelectOption(option.message)}
              style={{ animationDelay: `${120 + i * 70}ms` }}
              className="anim-fade-up group flex items-center gap-3.5 rounded-2xl border border-chat-border
                         bg-chat-surface/80 px-4 py-3.5 text-left transition-all duration-200
                         hover:-translate-y-0.5 hover:border-chat-primary/40 hover:bg-chat-surface-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chat-primary/60"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border
                           border-chat-border bg-chat-bg/60 transition-colors group-hover:border-chat-primary/30"
              >
                <Icon className={`h-4 w-4 ${option.iconClass}`} strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-zinc-100">
                  {option.label}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-zinc-500">
                  {option.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p
        className="anim-fade-up text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600"
        style={{ animationDelay: "450ms" }}
      >
        22-node RAG pipeline&nbsp;&middot;&nbsp;Claude&nbsp;&middot;&nbsp;pgvector
      </p>
    </div>
  );
}
