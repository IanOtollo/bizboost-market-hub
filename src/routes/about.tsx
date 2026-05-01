import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Target, MapPin, Users, Package, Calendar, Globe } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Corporate Overview — Bizpoa Online Supermarket" },
      { name: "description", content: "Learn about Bizpoa's commitment to quality, efficiency, and the professionalization of the online supermarket experience in Kenya." },
    ],
  }),
  component: About,
});

const team = [
  { name: "Esther Mwangi", role: "Executive Chair", initials: "EM" },
  { name: "James Kimani", role: "Chief Operating Officer", initials: "JK" },
  { name: "Aisha Wambui", role: "Director of Logistics", initials: "AW" },
  { name: "Mike Ndegwa", role: "Chief Technology Officer", initials: "MN" },
];

const stats = [
  { icon: Package, n: "1,500+", l: "Stock Units" },
  { icon: Users, n: "50,000+", l: "Corporate Clients" },
  { icon: Globe, n: "Nationwide", l: "Distribution" },
  { icon: Calendar, n: "EST 2024", l: "Incorporated" },
];

function About() {
  return (
    <div className="bg-background">
      <section className="relative bg-primary text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50"/>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 border border-white/20 text-[10px] uppercase tracking-[0.4em] mb-8 font-bold">Institutional Profile</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter leading-none">
            Advancing Retail <br/>Through Professionalism
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Bizpoa is a premier online supermarket corporation dedicated to providing high-efficiency procurement solutions for the modern Kenyan household.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border shadow-2xl">
          {stats.map((s, i) => (
            <div key={i} className="bg-card p-10 text-center animate-fade-up" style={{ animationDelay: `${i*60}ms`}}>
              <div className="text-4xl font-bold text-primary tracking-tighter mb-2">{s.n}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">Our Mandate</div>
          <h2 className="text-4xl font-bold uppercase tracking-tighter mb-8">Corporate History & Strategic Mission</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed font-light text-base">
            <p>
              Founded in 2024, Bizpoa emerged from a necessity to professionalize the fragmented digital retail landscape in Nairobi. Our primary focus is the elimination of logistical friction and the standardization of quality in the household essentials market.
            </p>
            <p>
              We operate a high-efficiency distribution network that leverages advanced digital interfaces to connect consumers directly with a professionally managed inventory collection. Our commitment is to reliability, transparency, and the highest standards of retail excellence.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-px bg-border border border-border">
          <div className="bg-card p-12">
            <Target className="w-8 h-8 text-primary mb-6"/>
            <h3 className="font-bold text-lg uppercase tracking-tight mb-4">Strategic Mission</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">To optimize the procurement of household essentials through a reliable, scalable, and professional digital framework, ensuring quality at every touchpoint.</p>
          </div>
          <div className="bg-card p-12">
            <Shield className="w-8 h-8 text-primary mb-6"/>
            <h3 className="font-bold text-lg uppercase tracking-tight mb-4">Quality Assurance</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">Maintaining a rigorous standard of operational integrity and product verification to foster trust and long-term stability in the digital retail sector.</p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/30 py-32 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-6">Leadership</div>
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Executive Management</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <div key={m.name} className="bg-card border border-border p-8 text-center animate-fade-up" style={{ animationDelay: `${i*60}ms`}}>
                <div className="w-24 h-24 bg-primary text-white flex items-center justify-center font-bold text-2xl mb-6 mx-auto">{m.initials}</div>
                <div className="font-bold uppercase tracking-tight text-sm mb-1">{m.name}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="bg-primary p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">Establish a Corporate Account</h3>
            <p className="text-white/60 mb-12 max-w-xl mx-auto font-light">Join thousands of households and corporations that rely on Bizpoa for their procurement needs. Quality and reliability, guaranteed.</p>
            <Link to="/shop" className="inline-flex h-16 px-12 bg-white text-primary font-bold uppercase tracking-widest text-xs items-center hover:bg-secondary transition-colors">
              Access Inventory Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}