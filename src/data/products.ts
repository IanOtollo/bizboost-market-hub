export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  initials: string;
  image: string;
  isNew?: boolean;
  isFlash?: boolean;
};

export const categories = [
  { slug: "Fresh Produce", icon: "Apple", color: "oklch(0.2 0.04 260)" },
  { slug: "Dairy & Eggs", icon: "Milk", color: "oklch(0.2 0.04 260)" },
  { slug: "Bakery", icon: "Croissant", color: "oklch(0.2 0.04 260)" },
  { slug: "Meat & Poultry", icon: "Beef", color: "oklch(0.2 0.04 260)" },
  { slug: "Pantry Essentials", icon: "Warehouse", color: "oklch(0.2 0.04 260)" },
  { slug: "Beverages", icon: "Coffee", color: "oklch(0.2 0.04 260)" },
  { slug: "Household & Cleaning", icon: "Sparkles", color: "oklch(0.2 0.04 260)" },
  { slug: "Personal Care", icon: "User", color: "oklch(0.2 0.04 260)" },
  { slug: "Baby Products", icon: "Baby", color: "oklch(0.2 0.04 260)" },
  { slug: "Electronics", icon: "Smartphone", color: "oklch(0.2 0.04 260)" },
];

const initials = (n: string) =>
  n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

const make = (
  id: string, name: string, price: number, category: string,
  rating: number, reviews: number, description: string,
  flags: { isNew?: boolean; isFlash?: boolean } = {}
): Product => ({
  id, name, price, category, rating, reviews, description,
  initials: initials(name), image: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=400`, ...flags,
});

export const products: Product[] = [
  // Fresh Produce
  make("1510832171-3c921135448d", "Organic Red Apples (1kg)", 450, "Fresh Produce", 4.8, 124, "Fresh, crisp red apples sourced from local organic farms."),
  make("1587334274328-2283a246a447", "Fresh Bananas (Bunch)", 150, "Fresh Produce", 4.7, 89, "Sweet, ripe bananas, rich in potassium."),
  make("1597362925123-77861d3eeac4", "Hass Avocado (Each)", 60, "Fresh Produce", 4.9, 210, "Creamy, large Hass avocados perfect for any meal."),
  make("1566385102311-63e1d7d0e0a5", "Fresh Spinach (Bunch)", 80, "Fresh Produce", 4.6, 56, "Deep green, nutrient-rich spinach leaves."),
  
  // Dairy & Eggs
  make("1563636619-e910029339cf", "Premium Whole Milk 2L", 280, "Dairy & Eggs", 4.8, 342, "Farm-fresh whole milk, pasteurized for safety and taste."),
  make("1550583726-2248277dd494", "Greek Yogurt Plain 500g", 350, "Dairy & Eggs", 4.7, 156, "Thick, creamy Greek yogurt, high in protein."),
  make("1528750955940-5d642ef8143c", "Cheddar Cheese 250g", 520, "Dairy & Eggs", 4.8, 92, "Aged sharp cheddar cheese, perfect for snacks and cooking."),
  make("1582401656496-9d75f6281023", "Large White Eggs (12pk)", 240, "Dairy & Eggs", 4.9, 412, "Farm-fresh large white eggs."),
  
  // Bakery
  make("1509440159596-0249088772ff", "Artisan Sourdough Bread", 420, "Bakery", 4.9, 78, "Handcrafted sourdough bread with a perfect crust."),
  make("1555507036-ab1f4038808a", "Butter Croissants (4pk)", 380, "Bakery", 4.7, 115, "Flaky, buttery croissants baked fresh daily."),
  make("1597650529123-24d5a7ffec7a", "Chocolate Chip Cookies (6pk)", 290, "Bakery", 4.8, 203, "Soft and chewy cookies with Belgian chocolate chips."),
  
  // Meat & Poultry
  make("1607623814075-e5121ae28741", "Prime Beef Steak (500g)", 850, "Meat & Poultry", 4.8, 145, "Tender, grass-fed prime beef steak."),
  make("1604908176997-125f2527c356", "Fresh Chicken Breast (1kg)", 750, "Meat & Poultry", 4.7, 189, "Skinless, boneless fresh chicken breast."),
  make("1544025162-d76694265947", "Premium Pork Chops (500g)", 680, "Meat & Poultry", 4.6, 67, "High-quality center-cut pork chops."),
  
  // Pantry Essentials
  make("1586201375745-f60aff44465b", "Extra Virgin Olive Oil 1L", 1250, "Pantry Essentials", 4.9, 312, "Cold-pressed extra virgin olive oil from Spain."),
  make("1599940824399-4258e756c3ef", "Basmati Rice 5kg", 1850, "Pantry Essentials", 4.8, 456, "Long-grain, aromatic aged Basmati rice."),
  make("1589985270826-4403070bc96a", "Premium Sea Salt 500g", 180, "Pantry Essentials", 4.7, 88, "Natural sea salt crystals for gourmet seasoning."),
  make("1510627489325-3007ec1031c1", "Organic Honey 500g", 650, "Pantry Essentials", 4.9, 215, "Pure, unfiltered wildflower honey."),
  
  // Beverages
  make("1544813546-697593bb3146", "Sparkling Water 1.5L", 120, "Beverages", 4.5, 340, "Crisp, refreshing sparkling mineral water."),
  make("1625082590740-9dc1005a9648", "Fresh Orange Juice 1L", 320, "Beverages", 4.7, 128, "100% pure squeezed orange juice, no added sugar."),
  make("1594631252811-f58a4c30c33a", "Premium Roast Coffee 250g", 1100, "Beverages", 4.9, 187, "Dark roast Arabica coffee beans, medium grind."),
  
  // Household & Cleaning
  make("1584622650139-3987d9120a2d", "Eco-Friendly Dish Soap", 280, "Household & Cleaning", 4.6, 142, "Plant-based, biodegradable dishwashing liquid."),
  make("1585314062331-1d52847ffad1", "Ultra Soft Toilet Paper (12pk)", 750, "Household & Cleaning", 4.8, 567, "Premium 3-ply toilet paper, soft and strong."),
  make("1608613307612-ba25e5e709b4", "Multi-Surface Cleaner 750ml", 450, "Household & Cleaning", 4.7, 231, "Effective antibacterial cleaner for all surfaces."),
  
  // Personal Care
  make("1559591933941-ed574220b5aa", "Natural Body Wash 500ml", 580, "Personal Care", 4.7, 167, "Sulfate-free body wash with essential oils."),
  make("1598440997627-750588944e42", "Whitening Toothpaste 100g", 250, "Personal Care", 4.6, 421, "Advanced whitening formula with fluoride."),
  make("1620916566854-2a67e56a4220", "Gentle Face Cleanser", 850, "Personal Care", 4.8, 112, "Dermatologist-tested cleanser for sensitive skin."),
  
  // Baby Products
  make("1594411130704-586739f76a3e", "Sensitive Baby Wipes (80pk)", 320, "Baby Products", 4.8, 890, "Fragrance-free wipes for delicate baby skin."),
  make("1603314944439-ef51207f272a", "Premium Baby Diapers (Size 3)", 1850, "Baby Products", 4.7, 1245, "Ultra-absorbent diapers with leak protection."),
  make("1612193671239-01ee7cc50e68", "Organic Baby Food Jar", 180, "Baby Products", 4.6, 312, "Smooth fruit puree for babies 6 months+."),
  
  // Electronics
  make("1511704953440-410bc3bc1944", "Fast Wireless Charger", 1200, "Electronics", 4.6, 345, "15W fast wireless charging pad for all devices."),
  make("1523275335640-470b4a838320", "Bluetooth Earbuds", 3500, "Electronics", 4.5, 678, "Compact earbuds with crystal clear sound quality."),
  make("1588872626084-257a3a5df555", "Portable Power Bank 10k mAh", 2800, "Electronics", 4.7, 156, "High-capacity power bank with dual USB ports."),
];

export const formatKsh = (n: number) =>
  "KSh " + n.toLocaleString("en-KE");

export const WHATSAPP_NUMBER = "254700000000";

export const buyOnWhatsApp = (productName: string, price: number) => {
  const msg = `Hi Bizpoa! I want to buy ${productName} - KSh ${price.toLocaleString("en-KE")}. Is it available?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};

export const checkoutCartOnWhatsApp = (
  items: { name: string; price: number; quantity: number }[],
  delivery: number
) => {
  const lines = items.map(i => `• ${i.name} x${i.quantity} - KSh ${(i.price * i.quantity).toLocaleString("en-KE")}`);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + delivery;
  const msg = `Hi Bizpoa Team! I'd like to place an order:\n\n${lines.join("\n")}\n\nSubtotal: KSh ${subtotal.toLocaleString("en-KE")}\nDelivery: KSh ${delivery}\nTotal: KSh ${total.toLocaleString("en-KE")}\n\nPlease confirm availability and delivery time. Thank you!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};