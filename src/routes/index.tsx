import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import * as Icons from "lucide-react";
import { ArrowRight, Truck, ShieldCheck, CreditCard, ChevronRight, Star, Play, X } from "lucide-react";
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
  const [showVideo, setShowVideo] = useState(false);
  
  return (
    <section className="relative pt-48 pb-20 px-6 min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Hero Card */}
          <div className="lg:col-span-8 glass rounded-[2.5rem] overflow-hidden relative min-h-[500px] flex items-end p-12 border border-white/50 shadow-2xl group animate-fade-up">
            <div className="absolute inset-0 -z-10 transition-transform duration-1000 group-hover:scale-110">
              <img 
                src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=2000" 
                alt="Premium Grocery" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 glass rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-white border-white/30">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now Dispatching Regionally
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 italic uppercase">
                The New <br/> Standard.
              </h1>
              <p className="text-lg text-white/80 mb-10 leading-relaxed font-light">
                IOMBiz is the definitive professional supermarket for the modern household. Engineered for speed, curated for excellence.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="h-16 px-12 glass rounded-full text-white font-bold uppercase text-xs tracking-[0.2em] flex items-center gap-3 hover:bg-white hover:text-primary transition-all group">
                  Enter Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </Link>
                <button onClick={() => setShowVideo(true)} className="w-16 h-16 glass rounded-full text-white flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Play className="w-5 h-5 fill-current ml-1"/>
                </button>
              </div>
            </div>
          </div>

          {showVideo && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-20">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowVideo(false)} />
              <div className="relative w-full max-w-5xl aspect-video glass rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl animate-zoom-in">
                <button onClick={() => setShowVideo(false)} className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center text-white z-10 hover:bg-white hover:text-black transition-all">
                  <X className="w-5 h-5"/>
                </button>
                <video 
                  src="https://assets.mixkit.co/videos/preview/mixkit-supermarket-aisle-at-night-42588-large.mp4" 
                  autoPlay 
                  controls 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Secondary Bento Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            <div className="glass rounded-[2.5rem] p-8 border border-white/50 flex flex-col justify-between animate-fade-up shadow-xl" style={{ animationDelay: "100ms" }}>
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <Truck className="w-5 h-5"/>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black tracking-tighter text-primary italic">SUB-60M</div>
                  <div className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Global Logistics</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Enterprise Logistics</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">Our corporate-grade fulfillment network is engineered for record-breaking regional dispatch speeds.</p>
              </div>
            </div>
            
            <div className="glass rounded-[2.5rem] p-8 border border-white/50 bg-primary overflow-hidden relative group animate-fade-up shadow-xl" style={{ animationDelay: "200ms" }}>
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="text-2xl font-black tracking-tighter text-white uppercase italic mb-2 leading-tight">Premium <br/>Curated <br/>Units</div>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Inventory Excellence</p>
                </div>
                <Link to="/shop" className="text-[10px] text-white font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all mt-4">
                  Access Directory <ArrowRight className="w-4 h-4"/>
                </Link>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            </div>
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
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto glass rounded-[2rem] border border-white/50 p-12 grid grid-cols-2 md:grid-cols-4 gap-12">
        {items.map((x, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <span className="text-4xl font-black text-primary tracking-tighter group-hover:scale-110 transition-transform">{x.value}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-2">{x.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryBento() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-32">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Department Matrix</h2>
          <p className="text-muted-foreground text-lg max-w-md font-light">Engineered categorization for efficient inventory sourcing.</p>
        </div>
        <Link to="/shop" className="hidden md:flex h-12 px-8 glass rounded-full items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary border-primary/20 hover:bg-primary hover:text-white transition-all">
          View All <ChevronRight className="w-4 h-4"/>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((c, i) => {
          const Icon = (Icons as any)[c.icon] ?? Icons.Package;
          return (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} 
              className={`glass p-8 rounded-[2rem] border border-white/50 hover:bg-white/60 transition-all group flex flex-col items-center text-center ${i === 0 ? "md:col-span-2 md:row-span-2 lg:col-span-1 lg:row-span-1" : ""}`}>
              <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:rotate-6">
                <Icon className="w-10 h-10 text-primary" strokeWidth={1.2}/>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-[0.2em]">{c.slug}</h3>
              <p className="text-[10px] text-muted-foreground mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Explore Units</p>
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
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 glass -z-10" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Top Tier Units</h2>
            <p className="text-muted-foreground text-lg font-light">The most requested inventory across all departments.</p>
          </div>
          <div className="flex gap-3">
            <button className="w-14 h-14 rounded-full glass border border-white/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ChevronRight className="w-5 h-5 rotate-180"/></button>
            <button className="w-14 h-14 rounded-full glass border border-white/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><ChevronRight className="w-5 h-5"/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
        </div>
        
        <div className="mt-20 text-center">
          <Link to="/shop" className="inline-flex h-16 px-12 glass rounded-full items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-primary border-primary/20 hover:bg-primary hover:text-white transition-all">
            Unlock Full Inventory Matrix <ArrowRight className="w-4 h-4"/>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Truck, title: "Swift Logistics", desc: "Enterprise-grade fulfillment network." },
    { icon: ShieldCheck, title: "Verified Units", desc: "Rigorous quality inspection on every item." },
    { icon: CreditCard, title: "Secure Matrix", desc: "Multiple encrypted settlement options." },
    { icon: Star, title: "Prime Support", desc: "24/7 dedicated corporate assistance." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-32 border-t border-border">
      <div className="grid md:grid-cols-4 gap-12">
        {items.map((x, i) => (
          <div key={i} className="group">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8 group-hover:bg-primary transition-all group-hover:-translate-y-2">
              <x.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{x.title}</h3>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">{x.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Index() {
  return (
    <div className="pb-20">
      <Hero />
      <Stats />
      <CategoryBento />
      <FeaturedSection />
      <Features />
      <Newsletter />
    </div>
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


