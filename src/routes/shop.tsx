import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, ChevronDown, Star } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Products — BizBoost Market" },
      { name: "description", content: "Browse 500+ products: food, fashion, electronics, beauty, home, shoes. Filter, sort, and pay via WhatsApp." },
      { property: "og:title", content: "Shop — BizBoost Market" },
      { property: "og:description", content: "All categories, all in one place." },
    ],
  }),
  component: Shop,
});

const PAGE_SIZE = 9;

function Shop() {
  const [cat, setCat] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"newest" | "price-low" | "price-high" | "rating">("newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (!cat || p.category === cat) &&
      p.price <= maxPrice &&
      p.rating >= minRating
    );
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, maxPrice, minRating, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => { setCat(null); setMaxPrice(5000); setMinRating(0); setPage(1); };

  const Sidebar = (
    <aside className="space-y-6">
      <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
        <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Category</h3>
        <div className="space-y-1">
          <button onClick={() => { setCat(null); setPage(1); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!cat ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"}`}>All categories</button>
          {categories.map(c => (
            <button key={c.slug} onClick={() => { setCat(c.slug); setPage(1); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${cat === c.slug ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"}`}>{c.slug}</button>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
        <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Price Range</h3>
        <input type="range" min={50} max={5000} step={50} value={maxPrice}
          onChange={e => { setMaxPrice(Number(e.target.value)); setPage(1); }}
          className="w-full accent-primary"/>
        <div className="flex justify-between text-xs mt-2 text-muted-foreground"><span>KSh 50</span><span className="font-bold text-primary">Up to KSh {maxPrice.toLocaleString()}</span></div>
      </div>
      <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
        <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Min Rating</h3>
        <div className="space-y-1">
          {[0, 4, 4.5, 4.7].map(r => (
            <button key={r} onClick={() => { setMinRating(r); setPage(1); }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${minRating === r ? "bg-accent/20 text-accent-foreground font-semibold" : "hover:bg-muted"}`}>
              <Star className="w-3.5 h-3.5 fill-accent text-accent"/> {r === 0 ? "All" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
      <button onClick={reset} className="w-full h-10 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-colors">Reset filters</button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <Link to="/" className="text-xs text-muted-foreground hover:text-primary">Home</Link>
        <span className="text-xs text-muted-foreground mx-1">/</span>
        <span className="text-xs">Shop</span>
        <h1 className="text-3xl md:text-4xl font-extrabold mt-1">All Products</h1>
        <p className="text-muted-foreground text-sm mt-1">Discover {products.length} hand-picked products across Kenya</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <div className="hidden lg:block">{Sidebar}</div>
        {showFilters && <div className="lg:hidden">{Sidebar}</div>}

        <div>
          <div className="flex items-center justify-between gap-3 mb-5 bg-card rounded-2xl p-3 px-4 border border-border shadow-soft">
            <div className="text-sm">
              <span className="font-bold">{filtered.length}</span>
              <span className="text-muted-foreground"> products</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(s => !s)} className="lg:hidden inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border text-sm font-semibold hover:bg-muted">
                <Filter className="w-4 h-4"/> Filters
              </button>
              <div className="relative">
                <select value={sort} onChange={e => setSort(e.target.value as any)}
                  className="appearance-none h-9 pl-3 pr-9 rounded-lg border border-border bg-background text-sm font-semibold focus:outline-none focus:border-primary">
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"/>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-border">
              <p className="text-muted-foreground">No products match your filters.</p>
              <button onClick={reset} className="mt-3 text-primary font-semibold text-sm">Reset filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-colors ${page === n ? "bg-primary text-primary-foreground shadow-glow" : "bg-card border border-border hover:bg-muted"}`}>{n}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}