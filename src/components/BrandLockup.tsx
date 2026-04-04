import { Link } from "react-router-dom";

interface BrandLockupProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const BrandLockup = ({ size = "md", className = "" }: BrandLockupProps) => {
  const sizes = {
    sm: { main: "text-sm", sub: "text-[8px]", icon: "w-5 h-5", inner: "w-2 h-2" },
    md: { main: "text-lg", sub: "text-[9px]", icon: "w-7 h-7", inner: "w-3 h-3" },
    lg: { main: "text-2xl", sub: "text-[10px]", icon: "w-9 h-9", inner: "w-4 h-4" },
  };

  const s = sizes[size];

  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className={`${s.icon} rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors`}>
        <div className={`${s.inner} rounded-sm bg-primary`} />
      </div>
      <div className="flex flex-col">
        <span className={`font-display ${s.main} font-bold tracking-tight leading-none`}>
          <span className="text-foreground">Build with </span>
          <span className="gradient-text">Her</span>
        </span>
        <span className={`${s.sub} tracking-[0.15em] uppercase text-muted-foreground font-medium leading-none mt-0.5`}>
          Built by Oz
        </span>
      </div>
    </Link>
  );
};

export default BrandLockup;
