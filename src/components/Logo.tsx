export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-lg">
        <span className="font-black text-white text-2xl tracking-tighter italic">I</span>
      </div>
      {!compact && (
        <div className="flex flex-col">
          <div className="font-black text-foreground text-2xl tracking-tighter uppercase leading-none italic">IOMBiz</div>
          <div className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground font-bold mt-1">Supermarket Corp.</div>
        </div>
      )}
    </div>
  );
}
