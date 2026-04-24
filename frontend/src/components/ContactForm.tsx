import { useState } from "react";
import type { ContactFormData } from "../types";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:dscode999@gmail.com?subject=${subject}&body=${body}`;
  };

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all text-white/90 placeholder-white/25"
    + " backdrop-blur-md border"
    + " bg-white/[0.06] border-white/[0.1]"
    + " focus:bg-white/[0.1] focus:border-violet-400/60"
    + " hover:bg-white/[0.08]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className={inputClass}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
          className={inputClass}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
      </div>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell me about your project..."
        required
        rows={5}
        className={inputClass + " resize-none"}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      />
      <button
        type="submit"
        className="btn-glass w-full"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Send Message →
      </button>
    </form>
  );
}
