import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, MessageCircle, Truck, ShieldCheck, Plus, Minus, ArrowLeft } from "lucide-react";
import { products, formatKsh, buyOnWhatsApp } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = products.find(x => x.id === params.id);
    return {
      meta: [
        { title: p ? `${p.name} — BizBoost Market` : "Product — BizBoost Market" },
        { name: "description", content: p?.description ?? "Shop quality products in Kenya." },
        { property: "og:title", content: p?.name ?? "Product" },
        { property: "og:description", content: p?.description ?? "" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="max-w-xl mx-auto py-20 px-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Product not found</h1>
      <Link to="/shop" className="text-primary font-semibold">Back to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = products.find(p => p.id === id);
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState("Default");

  if (!product) {
    return (
      <div className="max-w-xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Product not found</h1>
        <Link to="/shop" className="text-primary font-semibold">Back to shop</Link>
      </div>
    );
  }

  const wished = wishlist.includes(product.id);
  const variants =
    product.category === "Fashion & Clothing" ? ["S", "M", "L", "XL"] :
    product.category === "Shoes" ? ["38", "40", "42", "44"] :
    null;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <button onClick={() => navigate({ to: "/shop" })} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4"/> Back to shop
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-3xl shadow-card relative overflow-hidden bg-card">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.isFlash && <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-destructive text-white shadow-soft">⚡ Flash Deal</span>}
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[0,1,2,3].map(i => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden opacity-80 hover:opacity-100 cursor-pointer transition-opacity border-2 border-transparent hover:border-primary bg-card">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="text-xs uppercase tracking-[0.25em] font-bold text-accent">{product.category}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{product.name}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? "fill-accent text-accent" : "text-muted"}`}/>)}
            </div>
            <span className="font-semibold text-sm">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-extrabold text-primary">{formatKsh(product.price)}</div>
            <div className="text-base text-muted-foreground line-through">{formatKsh(Math.round(product.price * 1.25))}</div>
            <span className="px-2 py-0.5 rounded-md gradient-gold text-primary-deep text-xs font-bold">-20%</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {variants && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-2">Size</div>
              <div className="flex gap-2">
                {variants.map(v => (
                  <button key={v} onClick={() => setVariant(v)}
                    className={`w-12 h-12 rounded-xl font-bold text-sm transition-all ${variant === v ? "bg-primary text-primary-foreground shadow-glow" : "bg-card border border-border hover:border-primary"}`}>{v}</button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-2">Quantity</div>
            <div className="inline-flex items-center bg-card border border-border rounded-xl">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-l-xl"><Minus className="w-4 h-4"/></button>
              <div className="w-12 text-center font-bold">{qty}</div>
              <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded-r-xl"><Plus className="w-4 h-4"/></button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => buyOnWhatsApp(product.name, product.price * qty)}
              className="flex-1 h-14 rounded-2xl bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-bold flex items-center justify-center gap-2 shadow-glow hover:scale-[1.02] transition-transform"
            >
              <MessageCircle className="w-5 h-5"/> Buy Now on WhatsApp
            </button>
            <button
              onClick={() => { addToCart(product, qty); }}
              className="h-14 px-6 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-primary-deep transition-colors"
            >Add to Cart</button>
            <button onClick={() => toggleWishlist(product.id)} aria-label="Wishlist"
              className="h-14 w-14 rounded-2xl bg-card border border-border hover:border-primary flex items-center justify-center transition-colors">
              <Heart className={`w-5 h-5 ${wished ? "fill-destructive text-destructive" : ""}`}/>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <Truck className="w-5 h-5 text-primary shrink-0"/>
              <div className="text-xs"><div className="font-bold">Delivery</div><div className="text-muted-foreground">Nairobi CBD: Same Day · Other: 1–3 Days</div></div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0"/>
              <div className="text-xs"><div className="font-bold">Authentic</div><div className="text-muted-foreground">7-day returns · 100% verified</div></div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-extrabold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
          </div>
        </section>
      )}
    </div>
  );
}