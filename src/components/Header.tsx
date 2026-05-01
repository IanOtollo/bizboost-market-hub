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
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] max-w-7xl glass rounded-3xl sm:rounded-full border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-300">
        <div className="px-4 sm:px-8">
          <div className="flex items-center gap-6 lg:gap-12 h-16 sm:h-24">
            <Link to="/" className="shrink-0 scale-90 sm:scale-100 transition-transform"><Logo /></Link>

            <nav className="hidden lg:flex items-center gap-8">
              {nav.map(n => (
                <Link key={n.to} to={n.to}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary ${
                    path === n.to ? "text-primary scale-110" : "text-muted-foreground"
                  }`}>{n.label}</Link>
              ))}
            </nav>

            <div className="flex-1 hidden xl:block relative max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => { setQ(e.target.value); setOpen(true); }}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setTimeout(() => setOpen(false), 200)}
                  placeholder="Search Inventory Matrix..."
                  className="w-full h-11 pl-12 pr-4 rounded-full border border-border bg-white/40 focus:bg-white focus:border-primary outline-none text-xs font-medium transition-all"
                />
              </div>
              {open && q.trim().length > 0 && (
                <div className="absolute top-full mt-4 left-0 right-0 glass border border-white/40 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-down">
                  <div className="p-3 bg-primary/5 text-[9px] uppercase tracking-widest font-black text-primary border-b border-white/20">
                    {results.length > 0 ? "Inventory Match Found" : "Zero Catalog Matches"}
                  </div>
                  {results.map(p => (
                    <button
                      key={p.id}
                      onMouseDown={() => { navigate({ to: "/product/$id", params: { id: p.id } }); setQ(""); setOpen(false); }}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/50 transition-colors text-left border-b border-white/10 last:border-0"
                    >
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg border border-white/20 shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black uppercase tracking-tight truncate">{p.name}</div>
                        <div className="text-[10px] text-primary font-black mt-1 tracking-wider">{formatKsh(p.price)}</div>
                      </div>
                    </button>
                  ))}
                  
                  {results.length === 0 && (
                    <div className="p-8 text-center bg-transparent">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-6 leading-relaxed font-bold">
                        Unit not identified in digital catalog.
                      </p>
                      <a 
                        href={`https://wa.me/254700000000?text=${encodeURIComponent(`Corporate Inquiry: Unit Search for "${q}". Is this currently in physical stock?`)}`}
                        target="_blank" rel="noreferrer"
                        className="inline-block w-full p-4 text-[9px] uppercase tracking-[0.2em] font-black bg-primary text-white hover:bg-primary/90 transition-all rounded-xl"
                      >
                        Source via WhatsApp Matrix
                      </a>
                    </div>
                  )}

                  {results.length > 0 && (
                    <button 
                      onMouseDown={() => navigate({ to: "/shop" })}
                      className="w-full p-4 text-[9px] uppercase tracking-[0.2em] font-black text-center bg-primary text-white hover:bg-primary/90 transition-all"
                    >Expand Full Directory</button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              <Link to="/cart" className="flex items-center gap-3 px-6 sm:px-8 h-12 bg-primary text-white hover:bg-primary/90 transition-all shadow-lg rounded-full group">
                <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Reserve</span>
                {cartCount > 0 && (
                  <span className="ml-1 text-[10px] font-black bg-white text-primary px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setMenu(m => !m)} className="w-12 h-12 flex items-center justify-center border border-white/20 glass rounded-full hover:bg-white/50 transition-all">
                {menu ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
              </button>
            </div>
          </div>

          {menu && (
            <div className="py-8 border-t border-white/20 flex flex-col gap-6 animate-fade-down">
              <div className="relative mb-4 md:hidden">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => { setQ(e.target.value); setOpen(true); }}
                  placeholder="Search Inventory Matrix..."
                  className="w-full h-12 pl-12 pr-4 glass rounded-xl border border-white/20 outline-none text-xs font-bold"
                />
                {open && q.trim().length > 0 && (
                  <div className="absolute top-full mt-4 left-0 right-0 glass border border-white/40 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {results.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { navigate({ to: "/product/$id", params: { id: p.id } }); setQ(""); setOpen(false); setMenu(false); }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-white/50 transition-colors text-left border-b border-white/10"
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="text-xs font-black uppercase">{p.name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {nav.map(n => (
                  <Link key={n.to} to={n.to} onClick={() => setMenu(false)}
                    className={`p-4 rounded-2xl glass border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-center ${path === n.to ? "bg-primary text-white border-primary" : "text-muted-foreground"}`}>
                    {n.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}