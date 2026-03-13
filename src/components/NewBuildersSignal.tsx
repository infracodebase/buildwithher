import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ExtendedBuilderProfile } from "@/data/communityData";
import { Link } from "react-router-dom";

interface NewBuildersSignalProps {
  builders: ExtendedBuilderProfile[];
}

const NewBuildersSignal = ({ builders }: NewBuildersSignalProps) => {
  const recentBuilders = builders.slice(0, 10);

  const othersCount = Math.max(0, recentBuilders.length - 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-primary" />
        <h3 className="text-sm font-display font-semibold text-foreground">✨ New builders joining the community</h3>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Stacked avatars */}
        <div className="flex" style={{ marginLeft: 0 }}>
          {recentBuilders.map((builder, index) => (
            <Link
              key={builder.id}
              to={`/builders/${builder.slug}`}
              className="block rounded-full border-2 border-background overflow-hidden bg-secondary flex-shrink-0 hover:z-10 hover:scale-110 transition-transform"
              style={{ width: 36, height: 36, marginLeft: index === 0 ? 0 : -8 }}
              title={builder.name}
            >
              {builder.photo ? (
                <img src={builder.photo} alt={builder.name} className="w-full h-full object-cover" />
              ) : (
                <span className="w-full h-full flex items-center justify-center text-xs font-semibold text-muted-foreground">{builder.name.charAt(0)}</span>
              )}
            </Link>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">{recentBuilders[0]?.name}</span>,{" "}
          <span className="text-foreground font-medium">{recentBuilders[1]?.name}</span>
          {othersCount > 0 && <> and {othersCount} others</>} joined recently.{" "}
          <a href="/join-the-builders" className="text-primary hover:underline underline-offset-2">
            Create your builder card →
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default NewBuildersSignal;
