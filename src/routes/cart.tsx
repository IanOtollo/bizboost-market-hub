import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatKsh, checkoutCartOnWhatsApp } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Inventory Reserve — Bizpoa Online Supermarket" },
      { name: "description", content: "Review your inventory selection and finalize your corporate order." },
    ],
  }),
  component: Cart,
});

const DELIVERY = 250;

function Cart() {
  const { cart, removeFromCart, updateQty, subtotal, clearCart } = useStore();
  const total = subtotal + (cart.length > 0 ? DELIVERY : 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-12">
        <Link to="/" className="hover:text-primary">Index</Link>
        <ChevronRight className="w-3 h-3"/>
        <Link to="/shop" className="hover:text-primary">Catalog</Link>
        <ChevronRight className="w-3 h-3"/>
        <span className="text-foreground font-bold">Reserve</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Inventory Reserve</h1>
      <p className="text-muted-foreground text-sm mb-12 font-light uppercase tracking-[0.1em]">{cart.length} Unit{cart.length === 1 ? "" : "s"} allocated for processing</p>

      {cart.length === 0 ? (
        <div className="border border-dashed border-border py-32 text-center">
          <div className="w-16 h-16 mx-auto bg-secondary flex items-center justify-center mb-6">
            <ShoppingBag className="w-6 h-6 text-primary"/>
          </div>
          <h2 className="text-xl font-bold uppercase tracking-tight mb-2">No Units Reserved</h2>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-8">Access the inventory collection to allocate units.</p>
          <Link to="/shop" className="inline-flex h-14 px-10 bg-primary text-white font-bold uppercase tracking-widest text-[10px] items-center transition-colors hover:bg-primary/90">Browse Inventory</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_400px] gap-16">
          <div className="space-y-px bg-border border border-border">
            {cart.map(item => (
              <div key={item.product.id} className="bg-card p-6 flex gap-6 items-center">
                <Link to="/product/$id" params={{ id: item.product.id }}
                  className="w-24 h-24 bg-secondary/30 border border-border overflow-hidden shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-primary font-bold mb-1">{item.product.category}</div>
                  <Link to="/product/$id" params={{ id: item.product.id }} className="block font-bold text-sm uppercase tracking-tight hover:text-primary transition-colors line-clamp-1">{item.product.name}</Link>
                  <div className="text-primary font-bold mt-2 tracking-tight">{formatKsh(item.product.price)}</div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="inline-flex items-center border border-border">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"><Minus className="w-3 h-3"/></button>
                    <div className="w-10 text-center font-bold text-xs">{item.quantity}</div>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary transition-colors"><Plus className="w-3 h-3"/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1.5">
                    <Trash2 className="w-3 h-3"/> Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-card p-4">
              <button onClick={clearCart} className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground hover:text-destructive transition-colors">Void Selection</button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 self-start">
            <div className="bg-white border border-border p-10 space-y-8 shadow-2xl">
              <h2 className="font-bold uppercase tracking-widest text-sm border-b border-border pb-4">Corporate Summary</h2>
              <div className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-bold">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatKsh(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Logistics</span><span>{formatKsh(DELIVERY)}</span></div>
                <div className="pt-6 border-t border-border flex justify-between items-baseline"><span className="text-primary text-xs">Total Amount</span><span className="text-3xl font-bold tracking-tighter text-primary">{formatKsh(total)}</span></div>
              </div>
              <button
                onClick={() => checkoutCartOnWhatsApp(cart.map(c => ({ name: c.product.name, price: c.product.price, quantity: c.quantity })), DELIVERY)}
                className="w-full h-16 bg-primary text-white font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-5 h-5"/> Initialize Final Checkout
              </button>
              <div className="space-y-4 pt-6 border-t border-border">
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed text-center">Secure corporate procurement via encrypted WhatsApp protocols.</p>
                <div className="flex items-center justify-center gap-px bg-border border border-border">
                  <span className="bg-background flex-1 text-center py-2 text-[8px] font-bold uppercase tracking-widest">M-PESA</span>
                  <span className="bg-background flex-1 text-center py-2 text-[8px] font-bold uppercase tracking-widest">CASH</span>
                  <span className="bg-background flex-1 text-center py-2 text-[8px] font-bold uppercase tracking-widest">INVOICE</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}