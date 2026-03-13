import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Globe, Cloud, Plus, Minus } from "lucide-react";

const markers = [
{ label: "Nigeria", top: 52, left: 50, count: 8 },
{ label: "Kenya", top: 56, left: 57, count: 2 },
{ label: "United States", top: 38, left: 22, count: 3 },
{ label: "India", top: 44, left: 72, count: 3 },
{ label: "Germany", top: 30, left: 50, count: 1 },
{ label: "South Africa", top: 68, left: 53, count: 1 },
{ label: "UK", top: 28, left: 47, count: 1 },
{ label: "Canada", top: 28, left: 25, count: 1 },
{ label: "Ghana", top: 50, left: 48, count: 1 },
{ label: "DR Congo", top: 55, left: 53, count: 1 },
{ label: "Australia", top: 70, left: 83, count: 1 },
{ label: "Singapore", top: 53, left: 77, count: 1 }];


const stats = [
{ icon: Users, value: "78", label: "Members" },
{ icon: Globe, value: "12", label: "Countries" },
{ icon: Cloud, value: "Cloud • AI", label: "Infrastructure" }];


// Dotted world map coordinates - simplified continent outlines as dot clusters
const generateDots = () => {
  const dots: {x: number;y: number;}[] = [];

  // Use a deterministic pattern for continent shapes
  const continentRegions = [
  // North America
  ...fillRegion(140, 80, 340, 220, [
  [160, 90], [180, 85], [200, 80], [220, 75], [240, 70], [260, 72], [280, 68], [300, 65], [310, 70],
  [150, 100], [170, 95], [190, 90], [210, 88], [230, 85], [250, 80], [270, 78], [290, 75], [320, 72],
  [145, 110], [165, 108], [185, 105], [205, 100], [225, 98], [245, 95], [265, 92], [285, 88], [315, 80],
  [148, 120], [168, 118], [188, 115], [208, 112], [228, 108], [248, 105], [268, 100], [288, 95], [310, 88],
  [155, 130], [175, 128], [195, 125], [215, 122], [235, 118], [255, 115], [275, 110], [295, 105],
  [165, 140], [185, 138], [205, 135], [225, 132], [245, 128], [265, 125], [285, 118],
  [180, 150], [200, 148], [220, 145], [240, 142], [260, 138], [275, 132],
  [195, 160], [215, 158], [235, 155], [255, 152], [265, 148],
  [210, 170], [230, 168], [250, 165], [260, 160],
  [225, 180], [245, 178], [255, 175],
  [235, 190], [250, 188]]
  ),
  // Central America
  ...fillRegion(230, 215, 290, 260, [
  [240, 220], [255, 225], [245, 230], [250, 238], [255, 245], [248, 252]]
  ),
  // South America
  ...fillRegion(250, 270, 370, 450, [
  [270, 275], [285, 272], [300, 278], [310, 282],
  [265, 290], [280, 288], [295, 285], [310, 290], [320, 295],
  [262, 305], [278, 302], [295, 300], [312, 305], [325, 310],
  [265, 320], [282, 318], [298, 315], [315, 320], [328, 325],
  [270, 335], [288, 332], [305, 330], [318, 335],
  [275, 350], [292, 348], [308, 345], [315, 350],
  [280, 365], [295, 362], [310, 360],
  [285, 378], [300, 375], [308, 372],
  [290, 390], [305, 388],
  [295, 402], [305, 400],
  [298, 415]]
  ),
  // Europe
  ...fillRegion(480, 50, 620, 150, [
  [495, 58], [510, 55], [525, 52], [540, 50], [555, 52], [570, 55], [585, 58],
  [490, 68], [505, 65], [520, 62], [535, 60], [550, 62], [565, 65], [580, 68], [595, 72],
  [492, 78], [508, 75], [524, 73], [540, 72], [556, 74], [572, 76], [588, 80], [600, 84],
  [496, 90], [512, 88], [528, 86], [544, 85], [560, 87], [576, 90], [592, 94],
  [500, 102], [516, 100], [532, 98], [548, 97], [564, 100], [580, 104],
  [506, 114], [522, 112], [538, 110], [554, 112], [570, 116],
  [512, 126], [528, 124], [544, 122], [558, 125],
  [520, 136], [536, 134], [550, 132]]
  ),
  // Africa
  ...fillRegion(490, 160, 620, 400, [
  [510, 168], [525, 165], [540, 162], [555, 165], [570, 168],
  [505, 180], [520, 178], [535, 175], [550, 178], [565, 180], [580, 184],
  [500, 195], [518, 192], [535, 190], [552, 192], [568, 195], [582, 198],
  [498, 210], [516, 208], [534, 205], [552, 208], [570, 212], [585, 216],
  [500, 225], [518, 222], [536, 220], [554, 222], [572, 226], [586, 230],
  [504, 240], [522, 238], [540, 236], [558, 240], [574, 244],
  [508, 255], [526, 252], [544, 250], [562, 254], [576, 258],
  [512, 270], [530, 268], [548, 266], [564, 270],
  [516, 285], [534, 282], [552, 280], [566, 284],
  [520, 300], [538, 298], [556, 296], [564, 300],
  [525, 315], [542, 312], [558, 310],
  [530, 328], [546, 326], [556, 324],
  [536, 340], [550, 338],
  [542, 352], [552, 350],
  [548, 362]]
  ),
  // Asia
  ...fillRegion(600, 50, 960, 250, [
  [620, 55], [640, 52], [660, 50], [680, 48], [700, 50], [720, 52], [740, 55], [760, 58], [780, 62],
  [615, 68], [635, 65], [655, 62], [675, 60], [695, 62], [715, 65], [735, 68], [755, 72], [775, 75], [795, 78],
  [618, 82], [638, 78], [658, 75], [678, 72], [698, 74], [718, 78], [738, 82], [758, 85], [778, 88], [798, 92], [818, 96],
  [625, 95], [645, 92], [665, 88], [685, 85], [705, 88], [725, 92], [745, 95], [765, 98], [785, 102], [805, 106], [825, 110],
  [635, 108], [655, 105], [675, 100], [695, 98], [715, 102], [735, 106], [755, 110], [775, 115], [795, 118], [815, 122],
  [650, 120], [670, 118], [690, 115], [710, 118], [730, 122], [750, 125], [770, 128], [790, 132], [810, 136],
  [660, 135], [680, 132], [700, 130], [720, 134], [740, 138], [760, 142], [780, 145], [800, 148],
  [670, 150], [690, 148], [710, 145], [730, 148], [750, 152], [770, 156], [790, 160],
  [685, 165], [705, 162], [725, 160], [745, 164], [765, 168], [785, 172],
  [700, 178], [720, 175], [740, 172], [760, 176], [780, 180],
  [720, 190], [740, 188], [760, 185], [775, 190],
  [740, 200], [755, 198], [768, 196],
  // Southeast Asia / Indonesia
  [820, 170], [840, 175], [860, 180], [880, 185],
  [830, 190], [850, 195], [870, 200], [890, 205],
  [845, 210], [865, 215], [885, 220],
  [860, 230], [880, 235]]
  ),
  // Australia
  ...fillRegion(870, 320, 1020, 420, [
  [890, 335], [910, 330], [930, 328], [950, 332], [970, 336], [990, 340],
  [885, 350], [905, 345], [925, 342], [945, 345], [965, 348], [985, 352], [1000, 356],
  [882, 365], [902, 360], [922, 358], [942, 360], [962, 364], [982, 368], [998, 372],
  [888, 380], [908, 375], [928, 372], [948, 375], [968, 378], [988, 382],
  [895, 392], [915, 388], [935, 386], [955, 390], [975, 394],
  [908, 404], [928, 400], [948, 398], [965, 402],
  [925, 412], [945, 410], [958, 408]]
  )];


  return continentRegions;
};

function fillRegion(_x1: number, _y1: number, _x2: number, _y2: number, points: number[][]) {
  return points.map(([x, y]) => ({ x, y }));
}

const worldDots = generateDots();

const GlobalMap = () => {
  const [zoom, setZoom] = useState(1);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.3, 2.5)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.3, 0.7)), []);

  return (
    <div className="space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="stat-card text-center p-4">
            <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
        )}
      </div>

      {/* Map */}
      <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/30 bg-card/50">
        <div className="relative aspect-[2/1] overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ scale: zoom }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ transformOrigin: "center center" }}>
            
            <svg viewBox="0 0 1100 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Dotted continents */}
              {worldDots.map((dot, i) =>
              <circle
                key={i}
                cx={dot.x * (1100 / 1100)}
                cy={dot.y * (500 / 460)}
                r="2"
                className="fill-foreground/10" />

              )}
            </svg>

            {/* Glowing markers */}
            {markers.map((m, i) =>
            <motion.div
              key={m.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${m.top}%`, left: `${m.left}%` }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              onMouseEnter={() => setHoveredMarker(m.label)}
              onMouseLeave={() => setHoveredMarker(null)}>
              
                <div className="relative cursor-pointer">
                  {/* Cluster or single marker */}
                  {m.count > 2 ?
                <div className="w-7 h-7 rounded-full bg-primary/90 flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-[0_0_14px_4px_hsl(var(--primary)/0.4)] border border-primary-foreground/20">
                      {m.count}
                    </div> :

                <>
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_4px_hsl(var(--primary)/0.4)]" />
                      <div className="absolute w-7 h-7 -top-[8px] -left-[8px] rounded-full bg-primary/20 animate-ping" style={{ animationDuration: `${2.5 + i % 3}s` }} />
                    </>
                }
                  
                  {/* Tooltip */}
                  {hoveredMarker === m.label &&
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 rounded-lg bg-card border border-border/50 text-xs text-foreground whitespace-nowrap shadow-xl z-50">
                  
                      <span className="font-semibold">{m.label}</span>
                      <span className="text-muted-foreground ml-1.5">· {m.count} {m.count === 1 ? "builder" : "builders"}</span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-border/50" />
                    </motion.div>
                }
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-lg bg-card/90 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all backdrop-blur-sm">
            
            <Plus size={14} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-lg bg-card/90 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all backdrop-blur-sm">
            
            <Minus size={14} />
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div>
            <span className="font-display font-bold text-xl text-foreground">78</span>
            <span className="text-xs text-muted-foreground ml-1">Members</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-foreground">12</span>
            <span className="text-xs text-muted-foreground ml-1">Countries</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/50">
          Scroll or + to zoom · Hover markers for details
        </div>
      </div>
    </div>);

};

export default GlobalMap;