import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  drift: number;
}

const COLORS = [
  "hsl(var(--primary))",
  "#C07A13",
  "#D7B11F",
  "#8ACB2B",
  "#4FA48F",
  "#2E6D8F",
  "hsl(var(--accent))",
];

const CelebrationEffect = ({ onComplete }: { onComplete?: () => void }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.6,
      duration: 1.2 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 60,
    }));
    setParticles(generated);

    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                top: `${80 + Math.random() * 20}%`,
                left: `${p.x + p.drift}%`,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0.5],
                rotate: [0, 180 + Math.random() * 360],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
              }}
              className="absolute"
              style={{
                width: p.size,
                height: p.size,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                backgroundColor: p.color,
              }}
            />
          ))}

          {/* Central sparkle burst */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CelebrationEffect;
