import { useState } from "react";
import { motion } from "framer-motion";
import { X, Filter } from "lucide-react";
import { filterOptions } from "@/data/communityData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BuilderFiltersProps {
  selectedFilters: {
    cloudPlatforms: string[];
    roles: string[];
    skills: string[];
    regions: string[];
  };
  onFilterChange: (filters: {
    cloudPlatforms: string[];
    roles: string[];
    skills: string[];
    regions: string[];
  }) => void;
}

const FilterTag = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
      isSelected
        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
        : "bg-secondary/60 text-muted-foreground border border-border/50 hover:bg-secondary hover:border-border hover:text-foreground"
    )}
  >
    {label}
  </button>
);

const BuilderFilters = ({ selectedFilters, onFilterChange }: BuilderFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    const current = selectedFilters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    
    onFilterChange({
      ...selectedFilters,
      [category]: updated,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      cloudPlatforms: [],
      roles: [],
      skills: [],
      regions: [],
    });
  };

  const hasActiveFilters =
    selectedFilters.cloudPlatforms.length > 0 ||
    selectedFilters.roles.length > 0 ||
    selectedFilters.skills.length > 0 ||
    selectedFilters.regions.length > 0;

  const totalActiveFilters =
    selectedFilters.cloudPlatforms.length +
    selectedFilters.roles.length +
    selectedFilters.skills.length +
    selectedFilters.regions.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
        >
          <Filter size={16} />
          <span>Explore Builders</span>
          {totalActiveFilters > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
              {totalActiveFilters}
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-muted-foreground hover:text-foreground gap-1"
          >
            <X size={12} />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filter Groups */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4 p-4 rounded-xl border border-border/50 bg-card/30"
        >
          {/* Cloud Platforms */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Cloud Platform
            </p>
            <div className="flex flex-wrap gap-2">
              {filterOptions.cloudPlatforms.map((platform) => (
                <FilterTag
                  key={platform}
                  label={platform}
                  isSelected={selectedFilters.cloudPlatforms.includes(platform)}
                  onClick={() => toggleFilter("cloudPlatforms", platform)}
                />
              ))}
            </div>
          </div>

          {/* Roles */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Role
            </p>
            <div className="flex flex-wrap gap-2">
              {filterOptions.roles.map((role) => (
                <FilterTag
                  key={role}
                  label={role}
                  isSelected={selectedFilters.roles.includes(role)}
                  onClick={() => toggleFilter("roles", role)}
                />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {filterOptions.skills.map((skill) => (
                <FilterTag
                  key={skill}
                  label={skill}
                  isSelected={selectedFilters.skills.includes(skill)}
                  onClick={() => toggleFilter("skills", skill)}
                />
              ))}
            </div>
          </div>

          {/* Regions */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Region
            </p>
            <div className="flex flex-wrap gap-2">
              {filterOptions.regions.map((region) => (
                <FilterTag
                  key={region}
                  label={region}
                  isSelected={selectedFilters.regions.includes(region)}
                  onClick={() => toggleFilter("regions", region)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BuilderFilters;
