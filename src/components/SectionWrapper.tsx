import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

const SectionWrapper = ({ children, className = "", id, noPadding }: SectionWrapperProps) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px 120px 0px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`${noPadding ? "" : "py-24 md:py-32"} ${className}`}
  >
    <div className="container">{children}</div>
  </motion.section>
);

export default SectionWrapper;
