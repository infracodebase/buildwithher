import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

const PageHero = ({ title, children, actions }: PageHeroProps) => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
    <div className="absolute inset-0 gradient-arc pointer-events-none" />
    <div className="container relative z-10 max-w-3xl mx-auto text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight gradient-text"
      >
        {title}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed"
      >
        {children}
      </motion.div>
      {actions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          {actions}
        </motion.div>
      )}
    </div>
  </section>
);

export default PageHero;
