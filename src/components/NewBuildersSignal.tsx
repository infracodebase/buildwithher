import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ExtendedBuilderProfile } from "@/data/communityData";

interface NewBuildersSignalProps {
  builders: ExtendedBuilderProfile[];
}

const NewBuildersSignal = ({ builders }: NewBuildersSignalProps) => {
  const recentBuilders = builders.slice(-6).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-primary" />
        <h3 className="text-sm font-display font-semibold text-foreground">New Builders Joining the Community</h3>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Stacked avatars */}
        <div className="flex -space-x-2.5">
          {recentBuilders.map((builder) => (
            <div
              key={builder.id}
              className="w-9 h-9 rounded-full border-2 border-background overflow-hidden bg-secondary flex items-center justify-center"
              title={builder.name}
            >
              {builder.photo ? (
                <img src={builder.photo} alt={builder.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-semibold text-muted-foreground">{builder.name.charAt(0)}</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">{recentBuilders[0]?.name}</span>,{" "}
          <span className="text-foreground font-medium">{recentBuilders[1]?.name}</span>, and others joined recently.{" "}
          <a href="/join-the-builders" className="text-primary hover:underline underline-offset-2">
            Create your builder card
          </a>.
        </p>
      </div>
    </motion.div>
  );
};

export default NewBuildersSignal;
