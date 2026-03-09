"use client";

import { useState } from "react";

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
  disabled?: boolean;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  additional: string;
}

export function detectContactForm(content: string): {
  preamble: string;
  hasForm: boolean;
} {
  // Detect the capture pattern: message contains "Name:" and "Email:" and "Company:"
  const hasName = /\bName\s*:/i.test(content);
  const hasEmail = /\bEmail\s*:/i.test(content);
  const hasCompany = /\bCompany\s*:/i.test(content);

  if (!hasName || !hasEmail || !hasCompany) {
    return { preamble: content, hasForm: false };
  }

  // Strip the form fields from the message to get the preamble text
  // The form portion typically starts at "Name:" or a line before it
  const lines = content.split("\n");
  const preambleLines: string[] = [];
  let hitForm = false;

  for (const line of lines) {
    if (!hitForm && /\b(Name|Number|Phone|Email|Company|Additional)\s*:/i.test(line)) {
      hitForm = true;
      continue;
    }
    if (hitForm) continue;
    preambleLines.push(line);
  }

  const preamble = preambleLines.join("\n").trim();
  return { preamble, hasForm: true };
}

export default function ContactForm({ onSubmit, disabled }: ContactFormProps) {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    company: "",
    additional: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitted(true);
    onSubmit(form);
  };

  if (submitted) {
    return (
      <div className="mt-3 rounded-xl bg-zinc-700/50 px-4 py-3 text-sm text-zinc-300">
        Got it. Noah will be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name *"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        disabled={disabled}
        className="rounded-lg bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        disabled={disabled}
        className="rounded-lg bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email *"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        disabled={disabled}
        className="rounded-lg bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Company"
        value={form.company}
        onChange={(e) => handleChange("company", e.target.value)}
        disabled={disabled}
        className="rounded-lg bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-blue-500"
      />
      <textarea
        placeholder="Additional information"
        value={form.additional}
        onChange={(e) => handleChange("additional", e.target.value)}
        disabled={disabled}
        rows={2}
        className="rounded-lg bg-zinc-700 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-blue-500 resize-none"
      />
      <button
        type="submit"
        disabled={disabled || !form.name.trim() || !form.email.trim()}
        className="mt-1 self-start rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Submit
      </button>
    </form>
  );
}
