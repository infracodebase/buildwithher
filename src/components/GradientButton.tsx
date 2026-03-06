import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface GradientButtonProps {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
  icon?: boolean;
  size?: "default" | "lg";
}

const GradientButton = ({
  to,
  onClick,
  children,
  variant = "primary",
  className = "",
  type = "button",
  icon = false,
  size = "default",
}: GradientButtonProps) => {
  const sizeClass = size === "lg" ? "h-12 px-8 text-sm" : "h-10 px-6 text-[13px]";

  const styles = {
    primary: `${sizeClass} inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 glow-blue ${className}`,
    outline: `${sizeClass} inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold border border-border/60 text-foreground hover:bg-secondary/50 hover:border-border transition-all duration-300 ${className}`,
    ghost: `${sizeClass} inline-flex items-center justify-center gap-2 rounded-xl font-display font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 ${className}`,
  };

  const content = (
    <>
      {children}
      {icon && <ArrowRight size={14} />}
    </>
  );

  if (to) {
    return <Link to={to} className={styles[variant]}>{content}</Link>;
  }

  return <button onClick={onClick} type={type} className={styles[variant]}>{content}</button>;
};

export default GradientButton;
