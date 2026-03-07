import { motion } from "framer-motion";
import { Users, Globe, Cloud } from "lucide-react";

const markers = [
  { label: "Nigeria", top: "52%", left: "48%" },
  { label: "Kenya", top: "56%", left: "58%" },
  { label: "United States", top: "38%", left: "22%" },
  { label: "India", top: "45%", left: "70%" },
  { label: "Germany", top: "33%", left: "50%" },
  { label: "South Africa", top: "68%", left: "53%" },
  { label: "UK", top: "32%", left: "46%" },
  { label: "Canada", top: "30%", left: "20%" },
  { label: "Australia", top: "70%", left: "82%" },
  { label: "Brazil", top: "60%", left: "30%" },
  { label: "UAE", top: "44%", left: "60%" },
  { label: "Singapore", top: "54%", left: "77%" },
];

const stats = [
  { icon: Users, value: "78", label: "Members" },
  { icon: Globe, value: "12", label: "Countries" },
  { icon: Cloud, value: "Cloud • AI", label: "Infrastructure" },
];

const GlobalMap = () => (
  <div className="space-y-10">
    {/* Stats */}
    <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
      {stats.map(({ icon: Icon, value, label }) => (
        <div key={label} className="stat-card text-center">
          <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
          <p className="font-display font-bold text-foreground text-lg">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>

    {/* Map */}
    <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden border border-border/30 bg-secondary/20">
      {/* World map SVG outline */}
      <svg viewBox="0 0 1000 500" className="w-full h-full opacity-[0.15]" fill="none" stroke="currentColor" strokeWidth="0.5">
        {/* Simplified continent outlines */}
        {/* North America */}
        <path d="M150,120 Q180,100 220,110 Q250,95 270,105 Q290,90 300,100 L310,130 Q300,150 280,170 Q260,190 240,200 L220,210 Q200,220 180,210 Q160,200 150,180 Z" className="text-foreground/60" />
        {/* South America */}
        <path d="M240,250 Q260,240 280,250 Q290,270 285,300 Q280,330 270,350 Q260,370 250,380 Q240,370 235,340 Q230,310 235,280 Z" className="text-foreground/60" />
        {/* Europe */}
        <path d="M440,100 Q460,90 480,95 Q500,90 510,100 Q520,110 515,125 Q510,135 500,140 Q490,145 475,140 Q460,135 450,125 Q445,115 440,100 Z" className="text-foreground/60" />
        {/* Africa */}
        <path d="M450,180 Q470,170 490,175 Q510,180 520,200 Q530,230 525,260 Q520,290 510,320 Q500,340 480,345 Q460,340 450,320 Q440,290 445,260 Q448,230 450,200 Z" className="text-foreground/60" />
        {/* Asia */}
        <path d="M540,80 Q580,70 620,75 Q660,80 700,90 Q740,100 760,120 Q770,140 760,160 Q740,180 710,190 Q680,195 650,190 Q620,185 590,175 Q560,165 545,145 Q535,125 535,105 Z" className="text-foreground/60" />
        {/* Australia */}
        <path d="M760,300 Q790,290 820,295 Q840,305 835,325 Q825,340 800,345 Q780,340 770,325 Q765,310 760,300 Z" className="text-foreground/60" />
      </svg>

      {/* Glowing markers */}
      {markers.map((m, i) => (
        <motion.div
          key={m.label}
          className="absolute"
          style={{ top: m.top, left: m.left }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
        >
          <div className="relative group">
            <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.6)]" />
            <div className="absolute w-5 h-5 -top-[5px] -left-[5px] rounded-full bg-primary/20 animate-ping" style={{ animationDuration: `${2 + (i % 3)}s` }} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 rounded bg-background/90 border border-border/50 text-[10px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {m.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default GlobalMap;
