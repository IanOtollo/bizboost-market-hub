import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/products";

export type CartItem = { product: Product; quantity: number };

type Ctx = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  cartCount: number;
  subtotal: number;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("bb_cart");
      const w = localStorage.getItem("bb_wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("bb_cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("bb_wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = (p: Product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(i => i.product.id === p.id);
      if (found) return prev.map(i => i.product.id === p.id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { product: p, quantity: qty }];
    });
    toast.success("Added to cart!", { description: p.name });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.product.id !== id));
  const updateQty = (id: string, qty: number) =>
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, quantity: Math.max(1, qty) } : i));
  const clearCart = () => setCart([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      if (prev.includes(id)) { toast("Removed from wishlist"); return prev.filter(x => x !== id); }
      toast.success("Added to wishlist ❤️");
      return [...prev, id];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, cartCount, subtotal }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};