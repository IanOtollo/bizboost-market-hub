import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Filter, ChevronDown, Star, X } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Catalog — Bizpoa Online Supermarket" },
      { name: "description", content: "Explore our professionally curated selection of premium supermarket essentials. Quality guaranteed." },
    ],
  }),
  component: Shop,
});

const PAGE_SIZE = 12;

function Shop() {
  const [cat, setCat] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(10000);
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

  const reset = () => { setCat(null); setMaxPrice(10000); setMinRating(0); setPage(1); };

  const Sidebar = (
    <aside className="space-y-8">
      <div>
        <h3 className="font-bold text-[10px] mb-4 uppercase tracking-[0.2em] text-primary">Department</h3>
        <div className="flex flex-col gap-px bg-border border border-border">
          <button onClick={() => { setCat(null); setPage(1); }}
            className={`text-left px-4 py-3 text-xs uppercase tracking-widest transition-colors ${!cat ? "bg-primary text-white font-bold" : "bg-background hover:bg-secondary"}`}>All Departments</button>
          {categories.map(c => (
            <button key={c.slug} onClick={() => { setCat(c.slug); setPage(1); }}
              className={`text-left px-4 py-3 text-xs uppercase tracking-widest transition-colors ${cat === c.slug ? "bg-primary text-white font-bold" : "bg-background hover:bg-secondary"}`}>{c.slug}</button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-[10px] mb-4 uppercase tracking-[0.2em] text-primary">Price Limit</h3>
        <div className="bg-secondary p-6 border border-border">
          <input type="range" min={50} max={10000} step={100} value={maxPrice}
            onChange={e => { setMaxPrice(Number(e.target.value)); setPage(1); }}
            className="w-full accent-primary"/>
          <div className="flex justify-between text-[10px] mt-4 uppercase tracking-widest font-bold">
            <span className="text-muted-foreground">Min</span>
            <span className="text-primary">KSh {maxPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <button onClick={reset} className="w-full h-12 bg-white border border-primary text-primary font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all">Reset All Filters</button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12 border-b border-border pb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Index</Link>
          <ChevronDown className="w-3 h-3 -rotate-90"/>
          <span>Catalog</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Inventory Collection</h1>
        <p className="text-muted-foreground text-sm mt-4 font-light max-w-xl">A comprehensive selection of premium goods sourced for the professional household. Quality assurance on every unit.</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-12">
        <div className="hidden lg:block">{Sidebar}</div>
        
        {showFilters && (
          <div className="fixed inset-0 z-50 bg-background lg:hidden p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold uppercase tracking-widest">Filter Directory</h2>
              <button onClick={() => setShowFilters(false)}><X className="w-6 h-6"/></button>
            </div>
            {Sidebar}
          </div>
        )}

        <div>
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="text-primary">{filtered.length}</span> Units Available
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowFilters(true)} className="lg:hidden h-10 px-4 border border-border text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                <Filter className="w-3 h-3"/> Filters
              </button>
              <div className="relative">
                <select value={sort} onChange={e => setSort(e.target.value as any)}
                  className="appearance-none h-10 pl-4 pr-10 border border-border bg-background text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary">
                  <option value="newest">Sort: Default</option>
                  <option value="price-low">Sort: Price Asc</option>
                  <option value="price-high">Sort: Price Desc</option>
                  <option value="rating">Sort: Rating</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"/>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-border">
              <p className="text-muted-foreground text-sm uppercase tracking-widest">No matching units in inventory.</p>
              <button onClick={reset} className="mt-4 text-primary font-bold text-xs uppercase tracking-widest underline underline-offset-4">Reset Directory</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-px mt-16 bg-border border border-border">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`h-12 px-6 text-[10px] font-bold uppercase tracking-widest transition-colors ${page === n ? "bg-primary text-white" : "bg-background hover:bg-secondary"}`}>{n}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}