import { Quote } from "lucide-react";

interface QuoteCardProps {
  name: string;
  role: string;
  quote: string;
}

const QuoteCard = ({ name, role, quote }: QuoteCardProps) => (
  <div className="card-premium p-6 flex flex-col gap-4 group relative overflow-hidden">
    <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
    <p className="text-sm text-secondary-foreground/90 leading-relaxed flex-1 relative z-10">"{quote}"</p>
    <div className="flex items-center gap-3 pt-2 border-t border-border/30">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-foreground font-display font-bold text-sm flex-shrink-0 group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
        {name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="font-display font-semibold text-sm text-foreground truncate">{name}</p>
        <p className="text-[11px] text-muted-foreground truncate">{role}</p>
      </div>
    </div>
  </div>
);

export default QuoteCard;
