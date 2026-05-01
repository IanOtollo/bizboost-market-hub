export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="relative">
        <div className="w-12 h-12 bg-primary flex items-center justify-center">
          <span className="font-bold text-white text-2xl tracking-tighter">B</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent"/>
      </div>
      {!compact && (
        <div className="flex flex-col">
          <div className="font-bold text-foreground text-2xl tracking-tighter uppercase leading-none">bizpoa</div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mt-1">Supermarket Corp.</div>
        </div>
      )}
    </div>
  );
}