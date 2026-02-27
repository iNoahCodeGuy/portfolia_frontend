"use client";

import { MenuOption } from "@/types/chat";

const MENU_OPTIONS: MenuOption[] = [
  { label: "Learn more about Noah", message: "Learn more about Noah" },
  { label: "See what Noah has built", message: "See what Noah has built" },
  { label: "Just looking around", message: "Just looking around" },
  { label: "Confess a crush", message: "Confess a crush" },
];

interface WelcomeScreenProps {
  onSelectOption: (message: string) => void;
}

export default function WelcomeScreen({ onSelectOption }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 gap-8">
      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-semibold mb-3">Portfolia</h1>
        <p className="text-zinc-400 text-lg">
          Noah&apos;s AI-powered portfolio assistant. I know about his projects,
          career, technical stack, and there&apos;s an MMA coaching story.
          Pick a lane or ask whatever you want.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {MENU_OPTIONS.map((option) => (
          <button
            key={option.label}
            onClick={() => onSelectOption(option.message)}
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-left text-sm
                       text-zinc-200 hover:bg-zinc-700 hover:border-zinc-600 transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
