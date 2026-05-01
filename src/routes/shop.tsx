import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Filter, ChevronDown, Star, X, Check } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { z } from "zod";

const shopSearchSchema = z.object({
  category: z.string().optional().catch(""),
  sort: z.enum(["newest", "price-low", "price-high", "rating"]).optional().catch("newest"),
});

export const Route = createFileRoute("/shop")({
  validateSearch: (search) => shopSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Catalog — Bizpoa Online Supermarket" },
      { name: "description", content: "Explore our professionally curated selection of premium supermarket essentials. Quality guaranteed." },
    ],
  }),
  component: Shop,
});

const PAGE_SIZE = 12;

type PriceRange = {
  label: string;
  min: number;
  max: number;
};

const PRICE_RANGES: PriceRange[] = [
  { label: "All Prices", min: 0, max: 1000000 },
  { label: "Under KSh 500", min: 0, max: 500 },
  { label: "KSh 500 — KSh 2,000", min: 500, max: 2000 },
  { label: "KSh 2,000 — KSh 5,000", min: 2000, max: 5000 },
  { label: "KSh 5,000 — KSh 10,000", min: 5000, max: 10000 },
  { label: "Over KSh 10,000", min: 10000, max: 1000000 },
];

function Shop() {
  const { category: searchCat, sort: searchSort } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  
  const [cat, setCat] = useState<string | null>(searchCat || null);
  const [priceRange, setPriceRange] = useState<PriceRange>(PRICE_RANGES[0]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"newest" | "price-low" | "price-high" | "rating">(searchSort || "newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCat(searchCat || null);
  }, [searchCat]);

  const updateFilters = (newCat: string | null) => {
    setCat(newCat);
    navigate({ search: (old) => ({ ...old, category: newCat || undefined }), replace: true });
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (!cat || p.category === cat) &&
      p.price >= priceRange.min &&
      p.price <= priceRange.max &&
      p.rating >= minRating
    );
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, priceRange, minRating, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reset = () => { 
    setCat(null); 
    setPriceRange(PRICE_RANGES[0]); 
    setMinRating(0); 
    setPage(1); 
    navigate({ search: {}, replace: true });
  };

  const Sidebar = (
    <aside className="space-y-10">
      <div className="glass p-6 rounded-[1.5rem] border border-white/20">
        <h3 className="font-bold text-[10px] mb-5 uppercase tracking-[0.2em] text-primary border-b border-primary/20 pb-2">Department Directory</h3>
        <div className="flex flex-col gap-1">
          <button onClick={() => updateFilters(null)}
            className={`text-left px-4 py-2.5 text-[11px] uppercase tracking-widest transition-all rounded-lg ${!cat ? "bg-primary text-white font-bold" : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/50"}`}>
            Total Inventory
          </button>
          {categories.map(c => (
            <button key={c.slug} onClick={() => updateFilters(c.slug)}
              className={`text-left px-4 py-2.5 text-[11px] uppercase tracking-widest transition-all rounded-lg ${cat === c.slug ? "bg-primary text-white font-bold" : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/50"}`}>
              {c.slug}
            </button>
          ))}
        </div>
      </div>
      
      <div className="glass p-6 rounded-[1.5rem] border border-white/20">
        <h3 className="font-bold text-[10px] mb-5 uppercase tracking-[0.2em] text-primary border-b border-primary/20 pb-2">Financial Tiers</h3>
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map(range => (
            <button 
              key={range.label} 
              onClick={() => { setPriceRange(range); setPage(1); }}
              className={`flex items-center justify-between px-4 py-2.5 text-[11px] uppercase tracking-widest transition-all rounded-lg ${priceRange.label === range.label ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:text-foreground hover:bg-white/50"}`}
            >
              {range.label}
              {priceRange.label === range.label && <Check className="w-3 h-3"/>}
            </button>
          ))}
        </div>
      </div>

      <button onClick={reset} className="w-full h-12 glass border border-primary/20 text-muted-foreground font-bold text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-primary hover:text-white transition-all">
        Clear Filter Matrix
      </button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-16 border-b border-border pb-10">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Index</Link>
          <ChevronDown className="w-3 h-3 -rotate-90"/>
          <span className="text-foreground font-bold">Catalog</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Unit Inventory Directory</h1>
        <p className="text-muted-foreground text-sm mt-6 font-light max-w-2xl leading-relaxed">
          The Bizpoa Corporate Catalog provides a comprehensive overview of our current stock. Each unit is tracked and verified for quality assurance and logistical efficiency.
        </p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-16">
        <div className="hidden lg:block">{Sidebar}</div>
        
        {showFilters && (
          <div className="fixed inset-0 z-50 glass lg:hidden p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-bold uppercase tracking-widest text-sm">Filter Directory</h2>
              <button onClick={() => setShowFilters(false)} className="w-12 h-12 flex items-center justify-center border border-border rounded-full glass"><X className="w-5 h-5"/></button>
            </div>
            {Sidebar}
          </div>
        )}

        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 border-b border-border pb-6">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
              <span className="text-primary font-black">{filtered.length}</span> verified units in current view
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button onClick={() => setShowFilters(true)} className="lg:hidden flex-1 h-12 px-6 glass border border-border rounded-full text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                <Filter className="w-3 h-3"/> Refine Search
              </button>
              <div className="relative flex-1 sm:flex-initial">
                <select value={sort} onChange={e => setSort(e.target.value as any)}
                  className="appearance-none w-full h-12 pl-6 pr-12 border border-border glass rounded-full text-[10px] uppercase tracking-widest font-bold focus:outline-none focus:border-primary cursor-pointer">
                  <option value="newest">Sequence: Default</option>
                  <option value="price-low">Sequence: Value (Low to High)</option>
                  <option value="price-high">Sequence: Value (High to Low)</option>
                  <option value="rating">Sequence: Customer Index</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-muted-foreground"/>
              </div>
            </div>
          </div>

          {paged.length === 0 ? (
            <div className="text-center py-40 border border-border bg-secondary/20">
              <p className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-bold">Zero matching units found in current matrix.</p>
              <button onClick={reset} className="mt-6 h-12 px-10 border border-primary text-primary font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all">Reinitialize Search</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
              {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-px mt-24 border border-border bg-border">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`h-14 px-8 text-[10px] font-bold uppercase tracking-widest transition-colors ${page === n ? "bg-primary text-white" : "bg-white hover:bg-secondary"}`}>
                  {n.toString().padStart(2, '0')}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
