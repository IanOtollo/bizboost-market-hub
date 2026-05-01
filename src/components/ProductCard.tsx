import { Link } from "@tanstack/react-router";
import { Heart, Star, MessageCircle, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { formatKsh, buyOnWhatsApp } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <div className="group bg-card rounded-none overflow-hidden shadow-soft border border-border/60 transition-all duration-300 hover:shadow-lg animate-fade-up"
      style={{ animationDelay: `${index * 40}ms` }}>
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <Link to="/product/$id" params={{ id: product.id }} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-0 left-0 p-3 flex flex-col gap-1">
          {product.isFlash && <span className="px-2 py-1 text-[8px] font-bold uppercase tracking-widest bg-primary text-white">Featured</span>}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{product.category}</div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-bold text-sm tracking-tight line-clamp-2 min-h-[2.5rem] uppercase">{product.name}</h3>
        </Link>
        <div className="text-xl font-bold text-primary tracking-tighter">{formatKsh(product.price)}</div>
        <div className="flex gap-px pt-2 border-t border-border/50">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 h-12 bg-primary text-white font-bold text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border/60">
      <div className="aspect-square bg-muted animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-muted rounded w-1/3 animate-pulse" />
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-5 bg-muted rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}