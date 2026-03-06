import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface GradientButtonProps {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit";
}

const GradientButton = ({ to, onClick, children, variant = "primary", className = "", type = "button" }: GradientButtonProps) => {
  const base = "inline-flex items-center justify-center h-11 px-6 rounded-lg font-display font-semibold text-sm transition-all duration-300";
  const styles = variant === "primary"
    ? `${base} bg-primary text-primary-foreground hover:opacity-90 glow-blue ${className}`
    : `${base} border border-border text-foreground hover:bg-secondary ${className}`;

  if (to) {
    return <Link to={to} className={styles}>{children}</Link>;
  }

  return <button onClick={onClick} type={type} className={styles}>{children}</button>;
};

export default GradientButton;
