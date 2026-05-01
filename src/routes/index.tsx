import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { ArrowRight, Truck, ShieldCheck, CreditCard, ChevronRight, Star } from "lucide-react";
import { products, categories, formatKsh } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bizpoa — The Professional Online Supermarket" },
      { name: "description", content: "Quality household essentials delivered with professionalism. Experience the new standard in Kenyan online shopping." },
    ],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="relative bg-primary text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/20 bg-white/5 text-[10px] uppercase tracking-[0.2em] font-bold">
            Established 2026 • Premium Quality
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tighter">
            The Professional Choice for Your Household.
          </h1>
          <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-xl font-light">
            Bizpoa delivers a curated selection of premium supermarket goods with the efficiency and reliability of a global enterprise. 
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="h-14 px-10 flex items-center bg-white text-primary font-bold uppercase text-xs tracking-widest hover:bg-white/90 transition-colors">
              Explore Collection <ArrowRight className="ml-2 w-4 h-4"/>
            </Link>
            <Link to="/about" className="h-14 px-10 flex items-center border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors">
              Our Vision
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { label: "Products Catalog", value: "5,000+" },
    { label: "Happy Customers", value: "250k" },
    { label: "Delivery Points", value: "47 Counties" },
    { label: "Quality Rating", value: "4.9/5" },
  ];
  return (
    <div className="bg-secondary border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-between gap-8">
        {items.map((x, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-2xl font-bold text-primary">{x.value}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{x.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Curated Categories</h2>
          <p className="text-muted-foreground max-w-md">Browse our professionally organized departments for your daily essentials.</p>
        </div>
        <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center group">
          View Full Directory <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((c, i) => {
          const Icon = (Icons as any)[c.icon] ?? Icons.Package;
          return (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="glass p-8 rounded-[1.5rem] hover:bg-white/50 transition-all group flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-8 h-8 text-primary" strokeWidth={1.5}/>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-[0.1em]">{c.slug}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function FeaturedSection() {
  const featured = products.slice(0, 8);
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 glass -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">Premium Selection</h2>
            <p className="text-muted-foreground max-w-md">Our highest rated essentials, hand-picked for quality.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Rigorous quality control on every item we stock." },
    { icon: Truck, title: "Corporate Logistics", desc: "Dedicated delivery fleet ensuring timely arrival." },
    { icon: CreditCard, title: "Secure Transactions", desc: "Formal payment processing for your peace of mind." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-3 gap-12">
        {items.map((x, i) => (
          <div key={i} className="flex flex-col text-center items-center">
            <div className="w-16 h-16 border border-border flex items-center justify-center mb-6">
              <x.icon className="w-8 h-8 text-primary" strokeWidth={1}/>
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm mb-3">{x.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{x.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-3xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4">Corporate Updates</h2>
        <p className="text-white/60 mb-10 font-light">Join our professional network to receive curated offers and enterprise news.</p>
        <form className="flex flex-col sm:flex-row gap-px bg-white/10 p-1 border border-white/20">
          <input type="email" placeholder="Professional Email Address" className="flex-1 bg-transparent px-6 py-4 outline-none text-sm placeholder:text-white/30"/>
          <button className="bg-white text-primary px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <CategorySection />
      <FeaturedSection />
      <TrustSection />
      <Newsletter />
    </div>
  );
}

