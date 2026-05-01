import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, MessageCircle, Truck, ShieldCheck, Plus, Minus, ArrowLeft, ChevronRight } from "lucide-react";
import { products, formatKsh, buyOnWhatsApp } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = products.find(x => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.name} — Bizpoa Online Supermarket` : "Product — Bizpoa" },
        { name: "description", content: p?.description ?? "Premium goods for the modern household." },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="max-w-xl mx-auto py-32 px-6 text-center">
      <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Unit Not Found</h1>
      <Link to="/shop" className="text-primary font-bold uppercase tracking-widest text-xs underline underline-offset-4">Return to Inventory</Link>
    </div>
  ),
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = products.find(p => p.id === id);
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-32 px-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Unit Not Found</h1>
        <Link to="/shop" className="text-primary font-bold uppercase tracking-widest text-xs underline underline-offset-4">Return to Inventory</Link>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-12">
        <Link to="/" className="hover:text-primary">Index</Link>
        <ChevronRight className="w-3 h-3"/>
        <Link to="/shop" className="hover:text-primary">Catalog</Link>
        <ChevronRight className="w-3 h-3"/>
        <span className="text-foreground font-bold">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="aspect-square bg-secondary/30 border border-border overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[0,1,2,3].map(i => (
              <div key={i} className="aspect-square bg-secondary/30 border border-border opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-4">{product.category}</div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">{product.name}</h1>
          
          <div className="flex items-center gap-6 mb-8 border-y border-border py-6">
            <div className="text-4xl font-bold text-primary tracking-tighter">{formatKsh(product.price)}</div>
            <div className="text-lg text-muted-foreground line-through font-light">{formatKsh(Math.round(product.price * 1.2))}</div>
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Inventory Savings</span>
          </div>

          <div className="prose prose-sm text-muted-foreground mb-10 max-w-none">
            <p className="leading-relaxed font-light text-base">{product.description}</p>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Unit Quantity</div>
              <div className="inline-flex items-center border border-border">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors border-r border-border"><Minus className="w-3 h-3"/></button>
                <div className="w-16 text-center font-bold">{qty}</div>
                <button onClick={() => setQty(q => q + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors border-l border-border"><Plus className="w-3 h-3"/></button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-px bg-border border border-border">
              <button
                onClick={() => buyOnWhatsApp(product.name, product.price * qty)}
                className="flex-[2] h-16 bg-primary text-white font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5"/> Secure WhatsApp Checkout
              </button>
              <button
                onClick={() => { addToCart(product, qty); }}
                className="flex-1 h-16 bg-white text-primary font-bold uppercase tracking-[0.2em] text-xs hover:bg-secondary transition-colors"
              >Reserve Unit</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-10">
            <div className="flex items-start gap-4">
              <Truck className="w-5 h-5 text-primary mt-1 shrink-0"/>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Logistics</div>
                <div className="text-xs text-muted-foreground font-light leading-relaxed">Same-day regional dispatch for orders confirmed before 14:00. Global shipping available.</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-primary mt-1 shrink-0"/>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1">Assurance</div>
                <div className="text-xs text-muted-foreground font-light leading-relaxed">Each unit undergoes rigorous quality inspection. Full corporate warranty included.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Related Inventory</h2>
            <Link to="/shop" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline underline-offset-4">View All Items</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
          </div>
        </section>
      )}
    </div>
  );
}