import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Sparkles, Target, MapPin, Users, Package, Calendar } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BizBoost Market — Built in Nairobi" },
      { name: "description", content: "BizBoost Market is Kenya's freshest online store. Our story, mission, and the team making shopping joyful." },
      { property: "og:title", content: "About BizBoost Market" },
      { property: "og:description", content: "Built in Nairobi for Kenyans, with love." },
    ],
  }),
  component: About,
});

const team = [
  { name: "Esther Mwangi", role: "Founder & CEO", color: "oklch(0.79 0.16 75)", initials: "EM" },
  { name: "James Kimani", role: "Head of Operations", color: "oklch(0.46 0.09 165)", initials: "JK" },
  { name: "Aisha Wambui", role: "Customer Experience", color: "oklch(0.7 0.18 350)", initials: "AW" },
  { name: "Mike Ndegwa", role: "Tech Lead", color: "oklch(0.6 0.22 27)", initials: "MN" },
];

const stats = [
  { icon: Package, n: "500+", l: "Products" },
  { icon: Users, n: "10,000+", l: "Happy Customers" },
  { icon: MapPin, n: "Nairobi", l: "Based" },
  { icon: Calendar, n: "2024", l: "Established" },
];

function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero"/>
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl"/>
        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold mb-5">
            <Heart className="w-3.5 h-3.5 fill-accent text-accent"/> Made in Kenya, for Kenyans
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight text-balance">
            Building Kenya's most-loved online store, <span className="bg-gradient-to-r from-accent-glow to-accent bg-clip-text text-transparent">one order at a time.</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            BizBoost Market started in a Nairobi apartment with a simple idea — shopping should feel as easy as messaging a friend on WhatsApp.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center shadow-soft animate-fade-up" style={{ animationDelay: `${i*60}ms`}}>
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mx-auto mb-3"><s.icon className="w-6 h-6 text-primary-deep"/></div>
              <div className="text-2xl md:text-3xl font-extrabold text-primary">{s.n}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] font-bold text-accent mb-2">Our Story</div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">From a kibanda dream to thousands of homes</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In late 2023, our founder Esther was helping her mum order unga, sukuma, and a kettle from three different shops over WhatsApp. The friction was painful. Why couldn't shopping in Kenya feel as smooth as ordering a Bolt?
          </p>
          <p className="text-muted-foreground leading-relaxed">
            BizBoost Market is the answer. Curated products, transparent prices in KSh, and checkout right where you already chat — WhatsApp. Pay via M-PESA, cash on delivery, or any way you love. We deliver across Nairobi the same day, and to the rest of Kenya within 1–3 days.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-card rounded-3xl p-7 border border-border shadow-soft relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full gradient-gold opacity-20 blur-2xl"/>
            <Target className="w-8 h-8 text-primary mb-3"/>
            <h3 className="font-extrabold text-xl mb-2">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Make quality products accessible to every Kenyan household, with a checkout that feels as natural as a chat with a friend.</p>
          </div>
          <div className="bg-card rounded-3xl p-7 border border-border shadow-soft relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-primary opacity-15 blur-2xl"/>
            <Sparkles className="w-8 h-8 text-accent mb-3"/>
            <h3 className="font-extrabold text-xl mb-2">Our Vision</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">To be Africa's favourite chat-first storefront — where commerce feels personal, instant, and proudly local.</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.25em] font-bold text-accent mb-2">The Team</div>
          <h2 className="text-3xl md:text-4xl font-extrabold">The people behind the magic</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((m, i) => (
            <div key={m.name} className="bg-card border border-border rounded-2xl p-5 text-center shadow-soft hover:-translate-y-1 transition-transform animate-fade-up" style={{ animationDelay: `${i*60}ms`}}>
              <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-extrabold text-xl shadow-glow" style={{ background: m.color }}>{m.initials}</div>
              <div className="font-bold">{m.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-3xl gradient-hero p-10 sm:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-accent/30 blur-3xl"/>
          <div className="relative">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Ready to shop?</h3>
            <p className="text-white/80 mb-6 max-w-md mx-auto">Discover hundreds of products handpicked for you. Pay how you love.</p>
            <Link to="/shop" className="inline-flex h-12 px-7 rounded-full gradient-gold text-primary-deep font-bold shadow-gold hover:scale-105 transition-transform items-center">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}