import { Link } from "@tanstack/react-router";
import { Heart, Star, MessageCircle, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { formatKsh, buyOnWhatsApp } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border/60 animate-fade-up"
      style={{ animationDelay: `${index * 40}ms` }}>
      <div className="relative aspect-square overflow-hidden">
        <Link to="/product/$id" params={{ id: product.id }} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isFlash && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-destructive text-white shadow-soft">⚡ Flash</span>}
          {product.isNew && <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide gradient-gold text-primary-deep shadow-soft">New</span>}
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 transition-all ${wished ? "fill-destructive text-destructive" : "text-foreground"}`} />
        </button>
      </div>

      <div className="p-4 space-y-2.5">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{product.category}</div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1.5 text-xs">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="text-lg font-extrabold text-primary">{formatKsh(product.price)}</div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 h-10 rounded-xl bg-muted hover:bg-secondary text-foreground font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
          <button
            onClick={() => buyOnWhatsApp(product.name, product.price)}
            className="flex-1 h-10 rounded-xl bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-soft"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Buy
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