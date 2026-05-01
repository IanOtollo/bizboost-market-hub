import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Logo } from "./Logo";
import { useStore } from "@/context/StoreContext";
import { products, formatKsh } from "@/data/products";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

export function Header() {
  const { cartCount, wishlist } = useStore();
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
      <div className="h-1 gradient-flag" />
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 h-16 sm:h-20">
            <Link to="/" className="shrink-0"><Logo /></Link>

            <nav className="hidden md:flex items-center gap-1 ml-4">
              {nav.map(n => (
                <Link key={n.to} to={n.to}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    path === n.to ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
                  }`}>{n.label}</Link>
              ))}
            </nav>

            <div className="flex-1 hidden sm:block relative max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => { setQ(e.target.value); setOpen(true); }}
                  onFocus={() => setOpen(true)}
                  onBlur={() => setTimeout(() => setOpen(false), 200)}
                  placeholder="Search products..."
                  className="w-full h-11 pl-11 pr-4 rounded-full bg-muted/60 border border-transparent focus:border-primary focus:bg-background outline-none text-sm transition-all"
                />
              </div>
              {open && results.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-background rounded-2xl shadow-card border border-border overflow-hidden z-50">
                  {results.map(p => (
                    <button
                      key={p.id}
                      onMouseDown={() => { navigate({ to: "/product/$id", params: { id: p.id } }); setQ(""); setOpen(false); }}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted text-left transition-colors"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{formatKsh(p.price)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <Link to="/shop" className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-muted transition-colors relative">
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-white text-[10px] font-bold flex items-center justify-center">{wishlist.length}</span>
                )}
              </Link>
              <Link to="/cart" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">{cartCount}</span>
                )}
              </Link>
              <button onClick={() => setMenu(m => !m)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted">
                {menu ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
              </button>
            </div>
          </div>

          {/* mobile search */}
          <div className="sm:hidden pb-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={e => { setQ(e.target.value); setOpen(true); }}
              placeholder="Search products..."
              className="w-full h-10 pl-11 pr-4 rounded-full bg-muted/60 outline-none text-sm"
            />
            {open && results.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-background rounded-2xl shadow-card border border-border overflow-hidden z-50">
                {results.map(p => (
                  <button key={p.id}
                    onClick={() => { navigate({ to: "/product/$id", params: { id: p.id } }); setQ(""); setOpen(false); }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted text-left">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1"><div className="text-sm font-semibold truncate">{p.name}</div><div className="text-xs text-muted-foreground">{formatKsh(p.price)}</div></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {menu && (
            <div className="md:hidden pb-4 flex flex-col gap-1 animate-fade-up">
              {nav.map(n => (
                <Link key={n.to} to={n.to} onClick={() => setMenu(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold ${path === n.to ? "text-primary bg-primary/10" : "hover:bg-muted"}`}>{n.label}</Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}