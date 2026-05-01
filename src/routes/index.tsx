import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight, Sparkles, Truck, ShieldCheck, MessageCircle, Zap, Star } from "lucide-react";
import { products, categories, formatKsh } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BizBoost Market — Shop Everything. Pay via WhatsApp." },
      { name: "description", content: "Kenya's freshest online store. 500+ products across food, fashion, electronics, beauty, and more. Free Nairobi delivery." },
      { property: "og:title", content: "BizBoost Market — Kenya's Freshest Online Store" },
      { property: "og:description", content: "Shop everything. Pay via WhatsApp. Fast Nairobi delivery." },
    ],
  }),
  component: Index,
});

function Countdown() {
  const [t, setT] = useState({ h: 2, m: 59, s: 59 });
  useEffect(() => {
    const i = setInterval(() => {
      setT(prev => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 2; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="flex items-center gap-1.5 font-mono">
      {[
        { v: pad(t.h), l: "HRS" },
        { v: pad(t.m), l: "MIN" },
        { v: pad(t.s), l: "SEC" },
      ].map((x, i) => (
        <div key={i} className="bg-primary-deep text-white rounded-lg px-2 py-1 min-w-[44px] text-center">
          <div className="text-base font-extrabold">{x.v}</div>
          <div className="text-[8px] opacity-70 tracking-wider">{x.l}</div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-float" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary-glow/30 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"/> Made in Nairobi 🇰🇪
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] text-balance">
            Shop Everything.
            <br />
            <span className="bg-gradient-to-r from-accent-glow to-accent bg-clip-text text-transparent">Pay via WhatsApp.</span>
          </h1>
          <p className="text-base md:text-lg text-white/80 max-w-md leading-relaxed">
            Kenya's freshest online store. From unga to electronics — order in seconds, pay how you love.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/shop" className="inline-flex items-center gap-2 h-12 px-7 rounded-full gradient-gold text-primary-deep font-bold shadow-gold hover:scale-105 transition-transform">
              Shop Now <ArrowRight className="w-4 h-4"/>
            </Link>
            <a href="https://wa.me/254700000000" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors">
              <MessageCircle className="w-4 h-4"/> Chat with us
            </a>
          </div>
          <div className="flex items-center gap-4 pt-4 text-sm text-white/70">
            <div className="flex -space-x-2">
              {["EM", "JK", "AW", "MN"].map((s, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-deep flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: ["oklch(0.79 0.16 75)","oklch(0.6 0.22 27)","oklch(0.62 0.16 150)","oklch(0.7 0.18 350)"][i] }}>{s}</div>
              ))}
            </div>
            <div><span className="font-bold text-white">10,000+</span> happy Kenyans</div>
          </div>
        </div>

        <div className="relative hidden md:block animate-float">
          <div className="absolute inset-0 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 rotate-3" />
          <div className="relative grid grid-cols-2 gap-4 p-6">
            {products.slice(0, 4).map((p, i) => (
              <div key={p.id} className="bg-white rounded-2xl p-3 shadow-glow rotate-[var(--r)]" style={{ ["--r" as any]: `${(i % 2 === 0 ? -2 : 2)}deg` }}>
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-muted">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs font-semibold text-foreground truncate">{p.name}</div>
                <div className="text-sm font-extrabold text-primary">{formatKsh(p.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["FREE DELIVERY IN NAIROBI", "AUTHENTIC PRODUCTS", "M-PESA ACCEPTED", "24/7 SUPPORT"];
  return (
    <div className="bg-primary-deep text-white py-3 overflow-hidden border-y border-primary-glow/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((x, i) => (
          <span key={i} className="mx-8 text-xs font-bold tracking-[0.25em] flex items-center gap-8">
            {x} <span className="text-accent">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] font-bold text-accent mb-2">Browse</div>
          <h2 className="text-3xl md:text-4xl font-extrabold">Shop by Category</h2>
        </div>
        <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4"/></Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map((c, i) => {
          const Icon = (Icons as any)[c.icon] ?? Icons.Package;
          return (
            <Link key={c.slug} to="/shop"
              className="group bg-card rounded-2xl p-5 shadow-soft hover:shadow-card border border-border/60 hover:-translate-y-1 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-soft" style={{ backgroundColor: c.color }}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-sm leading-tight">{c.slug}</div>
              <div className="text-xs text-muted-foreground mt-1">Shop now →</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function FlashDeals() {
  const flash = products.filter(p => p.isFlash).slice(0, 4);
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="rounded-3xl gradient-hero p-6 sm:p-10 relative overflow-hidden shadow-glow">
        <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full bg-accent/30 blur-3xl"/>
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-primary-deep text-xs font-extrabold mb-2"><Zap className="w-3.5 h-3.5"/> FLASH DEALS</div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Limited Time Offers 🔥</h2>
          </div>
          <Countdown />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {flash.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  const items = products.slice().reverse().slice(0, 8);
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] font-bold text-accent mb-2">Just In</div>
          <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2"><Sparkles className="w-7 h-7 text-accent"/> New Arrivals</h2>
        </div>
        <Link to="/shop" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary">View all <ArrowRight className="w-4 h-4"/></Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
        {items.map((p, i) => (
          <div key={p.id} className="min-w-[240px] sm:min-w-[260px]"><ProductCard product={p} index={i}/></div>
        ))}
      </div>
    </section>
  );
}

function TrustBadges() {
  const items = [
    { icon: ShieldCheck, t: "100% Authentic", d: "Verified products" },
    { icon: Truck, t: "Fast Delivery", d: "Same-day in Nairobi" },
    { icon: Sparkles, t: "Easy Returns", d: "7-day guarantee" },
    { icon: MessageCircle, t: "WhatsApp Checkout", d: "Secure & instant" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {items.map((x, i) => (
          <div key={i} className="bg-card rounded-2xl p-5 border border-border/60 shadow-soft flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <x.icon className="w-5 h-5 text-primary"/>
            </div>
            <div className="min-w-0">
              <div className="font-bold text-sm">{x.t}</div>
              <div className="text-xs text-muted-foreground truncate">{x.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="rounded-3xl bg-card border border-border shadow-card p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full gradient-gold opacity-20 blur-3xl"/>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-primary opacity-15 blur-3xl"/>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1 mb-3"><Star className="w-4 h-4 fill-accent text-accent"/><Star className="w-4 h-4 fill-accent text-accent"/><Star className="w-4 h-4 fill-accent text-accent"/></div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Get exclusive deals first</h2>
          <p className="text-muted-foreground mb-6">Join 10,000+ Kenyans saving on flash deals every week.</p>
          {done ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-success text-white font-semibold">✓ You're in! Karibu sana.</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 h-12 px-5 rounded-full bg-muted/60 border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition-all"/>
              <button className="h-12 px-7 rounded-full bg-primary text-primary-foreground font-bold shadow-glow hover:scale-105 transition-transform">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <FlashDeals />
      <NewArrivals />
      <TrustBadges />
      <Newsletter />
    </div>
  );
}
