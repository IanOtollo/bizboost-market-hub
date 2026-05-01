import { ShoppingBag } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
          <span className="font-extrabold text-white text-lg tracking-tight">BB</span>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full gradient-gold flex items-center justify-center shadow-soft">
            <ShoppingBag className="w-3 h-3 text-primary-deep" strokeWidth={3} />
          </span>
        </div>
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="font-extrabold text-foreground text-base tracking-tight">BizBoost</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">Market</div>
        </div>
      )}
    </div>
  );
}