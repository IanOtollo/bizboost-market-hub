import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Logo />
          <p className="text-sm text-white/50 leading-relaxed font-light">The professional online supermarket for premium household essentials. Reliability and quality delivered to your doorstep.</p>
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
            <li className="flex items-center gap-2"><Mail className="w-4 h-4"/><span>contact@bizpoa.com</span></li>
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 text-white font-bold text-[10px] uppercase tracking-widest">
            Corporate Verified
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 bg-primary-deep">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-white/30 font-bold">
          <p>© 2026 BIZPOA CORPORATION. ALL RIGHTS RESERVED.</p>
          <p>Global Headquarters • Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}