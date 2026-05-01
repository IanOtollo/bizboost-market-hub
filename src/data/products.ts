export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  bg: string;
  initials: string;
  isNew?: boolean;
  isFlash?: boolean;
};

export const categories = [
  { slug: "Food & Groceries", icon: "ShoppingBasket", color: "oklch(0.79 0.16 75)" },
  { slug: "Fashion & Clothing", icon: "Shirt", color: "oklch(0.6 0.22 27)" },
  { slug: "Electronics", icon: "Smartphone", color: "oklch(0.46 0.09 165)" },
  { slug: "Beauty & Skincare", icon: "Sparkles", color: "oklch(0.7 0.18 350)" },
  { slug: "Home & Appliances", icon: "Home", color: "oklch(0.55 0.14 250)" },
  { slug: "Shoes", icon: "Footprints", color: "oklch(0.4 0.08 30)" },
  { slug: "Gifts & Hampers", icon: "Gift", color: "oklch(0.62 0.16 150)" },
  { slug: "Baby & Kids", icon: "Baby", color: "oklch(0.78 0.13 210)" },
];

const initials = (n: string) =>
  n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

const make = (
  id: string, name: string, price: number, category: string,
  rating: number, reviews: number, description: string, bg: string,
  flags: { isNew?: boolean; isFlash?: boolean } = {}
): Product => ({
  id, name, price, category, rating, reviews, description, bg,
  initials: initials(name), ...flags,
});

export const products: Product[] = [
  // Food & Groceries
  make("p1", "Unga wa Dola 2kg", 180, "Food & Groceries", 4.8, 312, "Premium maize flour, perfect for ugali. Trusted by Kenyan households since 1972.", "linear-gradient(135deg, oklch(0.86 0.17 82), oklch(0.7 0.16 60))", { isFlash: true }),
  make("p2", "Brookside Milk 500ml", 65, "Food & Groceries", 4.7, 540, "Fresh long-life milk from local farms. UHT processed for freshness.", "linear-gradient(135deg, oklch(0.95 0.02 220), oklch(0.78 0.13 210))"),
  make("p3", "Royco Mchuzi Mix 200g", 120, "Food & Groceries", 4.9, 421, "The secret to a delicious stew. A Kenyan kitchen essential.", "linear-gradient(135deg, oklch(0.6 0.22 27), oklch(0.4 0.18 25))"),
  make("p4", "Indomie Noodles 12 Pack", 360, "Food & Groceries", 4.6, 880, "Quick, tasty noodles. Perfect for breakfast or lunch in 3 minutes.", "linear-gradient(135deg, oklch(0.79 0.16 75), oklch(0.6 0.22 27))", { isNew: true }),
  // Fashion & Clothing
  make("f1", "Men's Ankara Print Shirt", 1200, "Fashion & Clothing", 4.7, 156, "Bold African print shirt. 100% cotton, tailored fit. Made in Kenya.", "linear-gradient(135deg, oklch(0.5 0.18 50), oklch(0.6 0.22 27))", { isFlash: true }),
  make("f2", "Women's Kitenge Dress", 2500, "Fashion & Clothing", 4.9, 203, "Elegant kitenge with modern silhouette. Stunning for occasions.", "linear-gradient(135deg, oklch(0.55 0.18 320), oklch(0.7 0.18 350))", { isNew: true }),
  make("f3", "Unisex Hoodie (Black)", 1800, "Fashion & Clothing", 4.6, 98, "Premium cotton-blend hoodie. Cozy and stylish for cool Nairobi nights.", "linear-gradient(135deg, oklch(0.25 0.02 250), oklch(0.4 0.04 250))"),
  make("f4", "Kids School Uniform Set", 950, "Fashion & Clothing", 4.5, 67, "Durable, comfortable uniform set. Ready for the school year.", "linear-gradient(135deg, oklch(0.55 0.14 250), oklch(0.7 0.16 230))"),
  // Electronics
  make("e1", "Wireless Earbuds Pro", 2999, "Electronics", 4.7, 489, "Bluetooth 5.3, 30hr battery, noise cancellation. Premium sound.", "linear-gradient(135deg, oklch(0.3 0.04 250), oklch(0.18 0.03 160))", { isFlash: true }),
  make("e2", "USB-C Fast Charger 65W", 850, "Electronics", 4.8, 312, "Charge your phone, tablet, or laptop. GaN tech, compact design.", "linear-gradient(135deg, oklch(0.46 0.09 165), oklch(0.34 0.07 166))"),
  make("e3", "Portable Bluetooth Speaker", 1500, "Electronics", 4.6, 221, "Loud, clear, waterproof. Take the party anywhere.", "linear-gradient(135deg, oklch(0.6 0.22 27), oklch(0.4 0.18 25))", { isNew: true }),
  make("e4", "Phone Holder for Car", 450, "Electronics", 4.4, 145, "Sturdy magnetic mount. One-hand operation, fits all phones.", "linear-gradient(135deg, oklch(0.5 0.05 250), oklch(0.35 0.03 250))"),
  // Beauty & Skincare
  make("b1", "Dark & Lovely Relaxer Kit", 650, "Beauty & Skincare", 4.7, 412, "Salon-quality results at home. Gentle on hair and scalp.", "linear-gradient(135deg, oklch(0.7 0.18 350), oklch(0.55 0.18 320))"),
  make("b2", "Nivea Body Lotion 400ml", 480, "Beauty & Skincare", 4.9, 678, "48hr deep moisture. For soft, glowing skin every day.", "linear-gradient(135deg, oklch(0.85 0.05 240), oklch(0.7 0.08 230))", { isFlash: true }),
  make("b3", "Vaseline Intensive Care 250ml", 320, "Beauty & Skincare", 4.8, 521, "Heals dry skin in 5 days. Trusted formula, generations strong.", "linear-gradient(135deg, oklch(0.55 0.14 250), oklch(0.4 0.1 250))"),
  make("b4", "Coconut Oil Hair Mask", 550, "Beauty & Skincare", 4.6, 234, "Pure coconut oil. Nourishes, strengthens, and shines your hair.", "linear-gradient(135deg, oklch(0.85 0.08 95), oklch(0.7 0.12 80))", { isNew: true }),
  // Home & Appliances
  make("h1", "Stainless Steel Sufuria Set", 1850, "Home & Appliances", 4.8, 187, "5-piece premium cookware set. Durable, even-heat distribution.", "linear-gradient(135deg, oklch(0.7 0.02 250), oklch(0.5 0.02 250))"),
  make("h2", "Electric Kettle 1.8L", 1200, "Home & Appliances", 4.7, 256, "Boils in 3 minutes. Auto shut-off, cool-touch handle.", "linear-gradient(135deg, oklch(0.4 0.04 250), oklch(0.25 0.02 250))"),
  make("h3", "Mosquito Repellent Plug-in", 380, "Home & Appliances", 4.5, 134, "Odorless, all-night protection. Safe for the whole family.", "linear-gradient(135deg, oklch(0.62 0.16 150), oklch(0.46 0.09 165))"),
  make("h4", "LED Bulb Pack of 4", 420, "Home & Appliances", 4.7, 312, "Save energy, last 25,000 hours. Bright, warm light.", "linear-gradient(135deg, oklch(0.86 0.17 82), oklch(0.79 0.16 75))"),
  // Shoes
  make("s1", "Men's Leather Loafers", 3200, "Shoes", 4.8, 89, "Genuine leather, hand-stitched. Office-ready elegance.", "linear-gradient(135deg, oklch(0.4 0.08 30), oklch(0.25 0.05 30))", { isNew: true }),
  make("s2", "Women's Block Heels", 2100, "Shoes", 4.7, 167, "Comfortable 6cm heel. Day-to-night versatility.", "linear-gradient(135deg, oklch(0.55 0.18 320), oklch(0.4 0.15 320))"),
  make("s3", "Kids Canvas Sneakers", 850, "Shoes", 4.6, 102, "Lightweight, washable. Ready for school and play.", "linear-gradient(135deg, oklch(0.6 0.22 27), oklch(0.5 0.18 25))"),
  make("s4", "Sports Running Shoes", 2800, "Shoes", 4.7, 245, "Mesh upper, cushioned sole. Feel the run.", "linear-gradient(135deg, oklch(0.46 0.09 165), oklch(0.62 0.16 150))", { isFlash: true }),
];

export const formatKsh = (n: number) =>
  "KSh " + n.toLocaleString("en-KE");

export const WHATSAPP_NUMBER = "254700000000";

export const buyOnWhatsApp = (productName: string, price: number) => {
  const msg = `Hi! I want to buy ${productName} - KSh ${price.toLocaleString("en-KE")}. Is it available?`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};

export const checkoutCartOnWhatsApp = (
  items: { name: string; price: number; quantity: number }[],
  delivery: number
) => {
  const lines = items.map(i => `• ${i.name} x${i.quantity} - KSh ${(i.price * i.quantity).toLocaleString("en-KE")}`);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + delivery;
  const msg = `Hi BizBoost Market! I'd like to order:\n\n${lines.join("\n")}\n\nSubtotal: KSh ${subtotal.toLocaleString("en-KE")}\nDelivery: KSh ${delivery}\nTotal: KSh ${total.toLocaleString("en-KE")}\n\nPlease confirm availability. Thank you!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
};