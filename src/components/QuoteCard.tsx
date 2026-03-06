interface QuoteCardProps {
  name: string;
  role: string;
  quote: string;
}

const QuoteCard = ({ name, role, quote }: QuoteCardProps) => (
  <div className="card-premium p-6 flex flex-col gap-4 group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-display font-bold text-sm flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        {name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="font-display font-semibold text-sm text-foreground truncate">{name}</p>
        <p className="text-[11px] text-muted-foreground truncate">{role}</p>
      </div>
    </div>
    <p className="text-sm text-secondary-foreground/80 leading-relaxed flex-1">"{quote}"</p>
  </div>
);

export default QuoteCard;
