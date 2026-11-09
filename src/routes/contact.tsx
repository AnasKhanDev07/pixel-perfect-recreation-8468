import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/veltron/Catalog";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact VELTRON — Client Services" }, { name: "description", content: "Get in touch with VELTRON client services for orders, fit advice and press." }, { property: "og:title", content: "Contact VELTRON" }, { property: "og:description", content: "We're here to help with fit, orders and more." }] }),
  component: Contact,
});
type F = { name: string; email: string; subject: string; message: string };
function Contact() {
  const [f, setF] = useState<F>({ name: "", email: "", subject: "", message: "" });
  const [errs, setErrs] = useState<Partial<F>>({}); const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); const er: Partial<F> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = "Please enter a valid email.";
    if (!f.subject.trim()) er.subject = "Please add a subject.";
    if (f.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    setErrs(er); if (!Object.keys(er).length) { setSent(true); setF({ name: "", email: "", subject: "", message: "" }); }
  };
  const field = (k: keyof F, label: string, area?: boolean) => (
    <label className="block"><span className="eyebrow text-muted-foreground">{label}</span>
      {area ? <textarea rows={5} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className="mt-2 w-full border-b border-foreground bg-transparent py-3 outline-none" />
        : <input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} className="mt-2 w-full border-b border-foreground bg-transparent py-3 outline-none" />}
      {errs[k] && <span className="mt-1 block text-sm text-destructive">{errs[k]}</span>}</label>
  );
  return (
    <>
      <PageHero eyebrow="Client Services" title="Contact" />
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 pb-24 md:grid-cols-[1fr_1.4fr] md:px-10">
        <div className="space-y-6 text-sm">
          <p className="flex gap-3"><MapPin className="h-4 w-4" /> Via della Spiga 12, Milan, Italy</p>
          <p className="flex gap-3"><Mail className="h-4 w-4" /> care@veltron.com</p>
          <p className="flex gap-3"><Phone className="h-4 w-4" /> +1 (212) 555-0188</p>
          <p className="text-muted-foreground">Monday – Saturday, 9:00 – 19:00 CET</p>
          <div className="flex gap-4 pt-4"><a href="https://instagram.com" aria-label="Instagram"><Instagram /></a><a href="https://x.com" aria-label="X"><Twitter /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube /></a></div>
        </div>
        <form noValidate onSubmit={submit} className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">{field("name", "Name")}{field("email", "Email")}</div>
          {field("subject", "Subject")}{field("message", "Message", true)}
          <button className="eyebrow bg-primary px-10 py-4 text-primary-foreground">Send message</button>
          {sent && <p className="text-sm">Thank you — our client team will reply within 24 hours.</p>}
        </form>
      </div>
    </>
  );
}
