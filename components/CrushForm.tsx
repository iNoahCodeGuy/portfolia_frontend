"use client";

import { useState } from "react";

interface CrushFormProps {
  onSubmit: (data: CrushFormData) => void;
  disabled?: boolean;
}

export interface CrushFormData {
  name: string;
  contact: string;
  message: string;
}

export default function CrushForm({ onSubmit, disabled }: CrushFormProps) {
  const [form, setForm] = useState<CrushFormData>({
    name: "",
    contact: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof CrushFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setSubmitted(true);
    onSubmit(form);
  };

  const inputClass =
    "rounded-lg border border-chat-border bg-chat-bg/60 px-3 py-2 text-sm text-zinc-100 " +
    "placeholder-zinc-500 outline-none transition-colors focus:border-chat-secondary/60 " +
    "focus:ring-1 focus:ring-chat-secondary/40";

  if (submitted) {
    return (
      <div className="mt-3 max-w-md rounded-2xl border border-chat-border bg-chat-surface px-4 py-3 text-sm text-zinc-300">
        Submitted. Noah knows.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 flex max-w-md flex-col gap-2 rounded-2xl border border-chat-border bg-chat-surface p-4"
    >
      <input
        type="text"
        aria-label="Name"
        placeholder="Name"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        disabled={disabled}
        className={inputClass}
      />
      <input
        type="text"
        aria-label="Number or social"
        placeholder="Number or social"
        value={form.contact}
        onChange={(e) => handleChange("contact", e.target.value)}
        disabled={disabled}
        className={inputClass}
      />
      <textarea
        aria-label="Message for Noah"
        placeholder="Message for Noah *"
        value={form.message}
        onChange={(e) => handleChange("message", e.target.value)}
        disabled={disabled}
        rows={3}
        className={`${inputClass} resize-none`}
      />
      <p className="text-xs text-zinc-500">
        Want to stay anonymous? Just leave name and contact info blank.
      </p>
      <button
        type="submit"
        disabled={disabled || !form.message.trim()}
        className="mt-1 self-start rounded-lg bg-chat-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-chat-secondary"
      >
        Submit
      </button>
    </form>
  );
}
