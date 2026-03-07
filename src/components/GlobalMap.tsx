import { motion } from "framer-motion";
import { Users, Globe, Cloud } from "lucide-react";

const markers = [
  { label: "Nigeria", top: "52%", left: "50%" },
  { label: "Kenya", top: "55%", left: "57%" },
  { label: "United States", top: "37%", left: "22%" },
  { label: "India", top: "43%", left: "72%" },
  { label: "Germany", top: "30%", left: "50%" },
  { label: "South Africa", top: "67%", left: "53%" },
  { label: "UK", top: "28%", left: "47%" },
  { label: "Canada", top: "28%", left: "25%" },
  { label: "Australia", top: "68%", left: "83%" },
  { label: "Brazil", top: "58%", left: "32%" },
  { label: "UAE", top: "42%", left: "61%" },
  { label: "Singapore", top: "53%", left: "77%" },
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
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/30 bg-card/50 p-4">
      <div className="relative aspect-[2/1]">
        {/* Dotted world map image via SVG */}
        <svg viewBox="0 0 1200 600" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid dots background */}
          <defs>
            <pattern id="dotGrid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-border/30" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#dotGrid)" />
          
          {/* Continent outlines as dotted paths */}
          {/* North America */}
          <path d="M120,100 C140,80 180,60 220,70 C260,55 290,65 310,60 C340,55 350,70 345,90 L340,120 C335,145 320,165 300,180 C280,195 260,210 235,220 L215,228 C195,235 175,230 160,220 C145,210 130,195 125,175 C120,155 115,130 120,100 Z" 
                strokeDasharray="3,3" stroke="currentColor" strokeWidth="1" className="text-foreground/15" />
          {/* South America */}
          <path d="M250,275 C265,265 285,270 300,275 C310,290 308,320 305,350 C300,380 290,400 280,420 C270,435 260,440 250,435 C240,425 235,400 233,370 C230,340 235,310 240,290 Z"
                strokeDasharray="3,3" stroke="currentColor" strokeWidth="1" className="text-foreground/15" />
          {/* Europe */}
          <path d="M500,60 C520,50 545,55 560,50 C580,48 595,55 605,70 C612,85 608,100 600,115 C592,125 580,130 565,128 C550,125 535,118 525,108 C515,98 505,85 502,72 Z"
                strokeDasharray="3,3" stroke="currentColor" strokeWidth="1" className="text-foreground/15" />
          {/* Africa */}
          <path d="M520,170 C540,160 565,165 585,175 C600,190 610,215 615,245 C618,275 615,310 605,340 C595,365 580,385 560,390 C540,385 525,370 515,345 C505,315 500,280 502,250 C504,220 510,195 520,170 Z"
                strokeDasharray="3,3" stroke="currentColor" strokeWidth="1" className="text-foreground/15" />
          {/* Asia */}
          <path d="M620,50 C670,40 720,45 770,55 C820,65 860,80 890,100 C910,120 920,145 910,170 C895,195 870,210 840,218 C810,225 775,220 745,210 C715,200 685,185 660,170 C640,155 625,135 620,110 C618,85 618,65 620,50 Z"
                strokeDasharray="3,3" stroke="currentColor" strokeWidth="1" className="text-foreground/15" />
          {/* Australia */}
          <path d="M900,340 C930,330 965,335 985,345 C1000,360 995,380 980,395 C965,405 940,410 920,405 C905,395 895,375 895,358 Z"
                strokeDasharray="3,3" stroke="currentColor" strokeWidth="1" className="text-foreground/15" />
          
          {/* Connection lines between markers */}
          <line x1="600" y1="312" x2="684" y2="330" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" className="text-primary/20" />
          <line x1="264" y1="222" x2="600" y2="312" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" className="text-primary/10" />
          <line x1="864" y1="258" x2="684" y2="330" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" className="text-primary/10" />
        </svg>

        {/* Glowing markers */}
        {markers.map((m, i) => (
          <motion.div
            key={m.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: m.top, left: m.left }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          >
            <div className="relative group cursor-pointer">
              <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_3px_hsl(var(--primary)/0.5)]" />
              <div className="absolute w-6 h-6 -top-[7px] -left-[7px] rounded-full bg-primary/15 animate-ping" style={{ animationDuration: `${2.5 + (i % 3)}s` }} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 rounded-md bg-card border border-border/50 text-[10px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {m.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-border/50" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default GlobalMap;
