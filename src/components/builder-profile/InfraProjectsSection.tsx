import { Server, Database, Shield, Code2 } from "lucide-react";

interface InfraProjectsSectionProps {
  building?: string[];
}

const placeholderProjects = [
  { title: "Cloud Infrastructure Setup", icon: Server, description: "Production-ready cloud architecture" },
  { title: "Database Architecture", icon: Database, description: "Scalable database design & management" },
  { title: "Security & Compliance", icon: Shield, description: "Infrastructure security hardening" },
  { title: "IaC Automation", icon: Code2, description: "Terraform & automation pipelines" },
];

const InfraProjectsSection = ({ building }: InfraProjectsSectionProps) => {
  const projects = building && building.length > 0
    ? building.map((item, i) => ({
        title: item,
        icon: placeholderProjects[i % placeholderProjects.length].icon,
        description: "Infrastructure project",
      }))
    : placeholderProjects;

  return (
    <section className="rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8">
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">
        Infrastructure Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((project, i) => {
          const Icon = project.icon;
          return (
            <div
              key={i}
              className="rounded-xl border border-border/30 bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{project.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{project.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InfraProjectsSection;
