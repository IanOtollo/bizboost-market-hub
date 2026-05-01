import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatKsh, checkoutCartOnWhatsApp } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — BizBoost Market" },
      { name: "description", content: "Review your cart and checkout via WhatsApp." },
    ],
  }),
  component: Cart,
});

const DELIVERY = 150;

function Cart() {
  const { cart, removeFromCart, updateQty, subtotal, clearCart } = useStore();
  const total = subtotal + (cart.length > 0 ? DELIVERY : 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="w-4 h-4"/> Continue Shopping
      </Link>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Your Cart</h1>
      <p className="text-muted-foreground text-sm mb-8">{cart.length} {cart.length === 1 ? "item" : "items"} ready for checkout</p>

      {cart.length === 0 ? (
        <div className="bg-card rounded-3xl border border-border shadow-soft py-20 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-muted-foreground"/>
          </div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-sm mb-5">Discover amazing products at unbeatable prices.</p>
          <Link to="/shop" className="inline-flex h-11 px-6 rounded-full bg-primary text-primary-foreground font-bold items-center shadow-glow hover:scale-105 transition-transform">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.product.id} className="bg-card rounded-2xl border border-border shadow-soft p-4 flex gap-4 items-center">
                <Link to="/product/$id" params={{ id: item.product.id }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-card">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{item.product.category}</div>
                  <Link to="/product/$id" params={{ id: item.product.id }} className="block font-bold text-sm sm:text-base hover:text-primary transition-colors line-clamp-1">{item.product.name}</Link>
                  <div className="text-primary font-extrabold mt-1">{formatKsh(item.product.price)}</div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="inline-flex items-center bg-muted rounded-xl">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-l-xl"><Minus className="w-3.5 h-3.5"/></button>
                    <div className="w-8 text-center font-bold text-sm">{item.quantity}</div>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-r-xl"><Plus className="w-3.5 h-3.5"/></button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1 transition-colors">
                    <Trash2 className="w-3 h-3"/> Remove
                  </button>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive font-semibold mt-2">Clear cart</button>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="bg-card rounded-3xl border border-border shadow-card p-6 space-y-4">
              <h2 className="font-extrabold text-lg">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">{formatKsh(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-semibold">{formatKsh(DELIVERY)}</span></div>
                <div className="border-t border-border pt-3 flex justify-between text-base"><span className="font-bold">Total</span><span className="font-extrabold text-primary text-xl">{formatKsh(total)}</span></div>
              </div>
              <button
                onClick={() => checkoutCartOnWhatsApp(cart.map(c => ({ name: c.product.name, price: c.product.price, quantity: c.quantity })), DELIVERY)}
                className="w-full h-13 py-3.5 rounded-2xl bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-bold flex items-center justify-center gap-2 shadow-glow hover:scale-[1.02] transition-transform"
              >
                <MessageCircle className="w-5 h-5"/> Checkout via WhatsApp
              </button>
              <p className="text-xs text-muted-foreground text-center">You'll be redirected to WhatsApp to confirm your order. Pay via M-PESA on delivery.</p>
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-border">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Secure</span>
                <span className="px-2 py-1 rounded bg-success/15 text-success text-[10px] font-bold">M-PESA</span>
                <span className="px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold">CASH</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}