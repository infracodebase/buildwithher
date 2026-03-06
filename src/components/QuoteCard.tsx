interface QuoteCardProps {
  name: string;
  role: string;
  quote: string;
}

const QuoteCard = ({ name, role, quote }: QuoteCardProps) => (
  <div className="rounded-xl bg-card border border-border/50 p-6 card-hover flex flex-col gap-4">
    <p className="text-sm text-secondary-foreground leading-relaxed italic">"{quote}"</p>
    <div className="mt-auto">
      <p className="font-display font-semibold text-sm text-foreground">{name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
    </div>
  </div>
);

export default QuoteCard;
