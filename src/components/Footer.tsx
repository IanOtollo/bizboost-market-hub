import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary-deep text-primary-foreground">
      <div className="h-1 gradient-flag" />
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-3 inline-block"><Logo /></div>
          <p className="text-sm text-white/70 leading-relaxed">Kenya's freshest online store. Shop everything, pay via WhatsApp.</p>
          <div className="flex gap-2">
            <a className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" href="#"><Facebook className="w-4 h-4"/></a>
            <a className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" href="#"><Instagram className="w-4 h-4"/></a>
            <a className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" href="#"><Twitter className="w-4 h-4"/></a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-accent">Shop</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link to="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
            <li><Link to="/shop" className="hover:text-accent transition-colors">Flash Deals</Link></li>
            <li><Link to="/shop" className="hover:text-accent transition-colors">New Arrivals</Link></li>
            <li><Link to="/cart" className="hover:text-accent transition-colors">Your Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-accent">Company</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><a className="hover:text-accent transition-colors" href="#">Careers</a></li>
            <li><a className="hover:text-accent transition-colors" href="#">Blog</a></li>
            <li><a className="hover:text-accent transition-colors" href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-accent">Contact</h4>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0"/> Nairobi CBD, Kenya</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4"/> +254 700 000 000</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4"/><span>hello@bizboost.co.ke</span></li>
          </ul>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-primary-deep font-bold text-xs shadow-soft">
            <span className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white text-[10px]">M</span>
            M-PESA Accepted
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>© 2024 BizBoost Market. All rights reserved.</p>
          <p>Designed & built in Nairobi 🇰🇪</p>
        </div>
      </div>
    </footer>
  );
}