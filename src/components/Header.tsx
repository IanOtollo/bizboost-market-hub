import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { Logo } from "./Logo";
import { useStore } from "@/context/StoreContext";
import { products, formatKsh } from "@/data/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Catalog" },
  { to: "/about", label: "Corporate" },
];

export function Header() {
  const { cartCount } = useStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useRouterState({ select: r => r.location.pathname });

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lower) || p.category.toLowerCase().includes(lower)
    ).slice(0, 6);
  }, [q]);

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-12 h-20 sm:h-24">
            <Link to="/" className="shrink-0"><Logo /></Link>

            <nav className="hidden lg:flex items-center gap-10">
              {nav.map(n => (
                <Link key={n.to} to={n.to}
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-primary ${
                    path === n.to ? "text-primary" : "text-muted-foreground"
                  }`}>{n.label}</Link>
              ))}
            </nav>

            <div className="flex-1 hidden md:block relative max-w-lg">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => { setQ(e.target.value); setOpen(true); }}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setTimeout(() => setOpen(false), 200)}
                  placeholder="Search Inventory Collection..."
                  className="w-full h-12 pl-12 pr-4 rounded-full border border-border bg-secondary/30 focus:bg-white focus:border-primary outline-none text-xs font-medium transition-all"
                />
              </div>
              {open && q.trim().length > 0 && (
                <div className="absolute top-full mt-px left-0 right-0 bg-white border border-border shadow-2xl overflow-hidden z-50">
                  <div className="p-2 bg-secondary/30 text-[9px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border">
                    {results.length > 0 ? "Matching Units" : "No direct matches found"}
                  </div>
                  {results.map(p => (
                    <button
                      key={p.id}
                      onMouseDown={() => { navigate({ to: "/product/$id", params: { id: p.id } }); setQ(""); setOpen(false); }}
                      className="w-full flex items-center gap-4 p-4 hover:bg-secondary transition-colors text-left border-b border-border/50 last:border-0"
                    >
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover border border-border" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold uppercase tracking-tight truncate">{p.name}</div>
                        <div className="text-[10px] text-primary font-bold mt-1 tracking-wider">{formatKsh(p.price)}</div>
                      </div>
                    </button>
                  ))}
                  
                  {results.length === 0 && (
                    <div className="p-6 text-center bg-background">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 leading-relaxed">
                        The requested item is not currently in our digital catalog.
                      </p>
                      <a 
                        href={`https://wa.me/254700000000?text=${encodeURIComponent(`Corporate Inquiry: I am looking for "${q}". Is this unit available in your physical inventory?`)}`}
                        target="_blank" rel="noreferrer"
                        className="inline-block w-full p-3 text-[9px] uppercase tracking-[0.2em] font-bold bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        Request Unit via WhatsApp
                      </a>
                    </div>
                  )}

                  {results.length > 0 && (
                    <button 
                      onMouseDown={() => navigate({ to: "/shop" })}
                      className="w-full p-3 text-[9px] uppercase tracking-[0.2em] font-bold text-center bg-primary text-white hover:bg-primary/90"
                    >View All Inventory</button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <Link to="/cart" className="flex items-center gap-3 px-6 h-12 bg-primary text-white hover:bg-primary/90 transition-colors relative">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Reserve</span>
                {cartCount > 0 && (
                  <span className="ml-1 text-[10px] font-bold">({cartCount})</span>
                )}
              </Link>
              <button onClick={() => setMenu(m => !m)} className="lg:hidden w-12 h-12 flex items-center justify-center border border-border hover:bg-secondary">
                {menu ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
              </button>
            </div>
          </div>

          {menu && (
            <div className="lg:hidden py-8 border-t border-border flex flex-col gap-6 animate-fade-down">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => { setQ(e.target.value); setOpen(true); }}
                  placeholder="Search Inventory..."
                  className="w-full h-12 pl-12 pr-4 border border-border bg-secondary/30 outline-none text-xs"
                />
                {open && q.trim().length > 0 && (
                  <div className="absolute top-full mt-px left-0 right-0 bg-white border border-border shadow-2xl overflow-hidden z-50">
                    <div className="p-2 bg-secondary/30 text-[9px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border">
                      {results.length > 0 ? "Matching Units" : "No direct matches found"}
                    </div>
                    {results.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { navigate({ to: "/product/$id", params: { id: p.id } }); setQ(""); setOpen(false); setMenu(false); }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-secondary transition-colors text-left border-b border-border/50 last:border-0"
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover border border-border" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold uppercase tracking-tight truncate">{p.name}</div>
                          <div className="text-[10px] text-primary font-bold mt-1 tracking-wider">{formatKsh(p.price)}</div>
                        </div>
                      </button>
                    ))}
                    {results.length === 0 && (
                      <div className="p-6 text-center bg-background">
                        <a 
                          href={`https://wa.me/254700000000?text=${encodeURIComponent(`Corporate Inquiry: I am looking for "${q}". Is this unit available in your physical inventory?`)}`}
                          target="_blank" rel="noreferrer"
                          className="inline-block w-full p-3 text-[9px] uppercase tracking-[0.2em] font-bold bg-primary text-white"
                        >
                          Request Unit via WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {nav.map(n => (
                <Link key={n.to} to={n.to} onClick={() => setMenu(false)}
                  className={`text-xs font-bold uppercase tracking-[0.2em] ${path === n.to ? "text-primary" : "text-muted-foreground"}`}>{n.label}</Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}