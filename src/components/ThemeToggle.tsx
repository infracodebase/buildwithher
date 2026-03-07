import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary border border-border/30 transition-all"
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
