import { Award, MapPin, Briefcase, CalendarDays, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  name: string;
  role: string;
  country: string;
  photo?: string;
  joinedYear: number;
  isOwner: boolean;
  onEdit?: () => void;
}

const ProfileHeader = ({ name, role, country, photo, joinedYear, isOwner, onEdit }: ProfileHeaderProps) => {
  return (
    <div className="relative -mt-16 md:-mt-20 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
        {/* Avatar overlapping banner */}
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-background shadow-xl shadow-background/50 flex-shrink-0">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <span className="font-display font-bold text-4xl md:text-5xl text-foreground/60">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Name & metadata */}
        <div className="flex-1 min-w-0 pb-1">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {name}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">{role}</p>
            </div>
            {isOwner && (
              <Button
                size="default"
                className="gap-2 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 font-medium px-5 flex-shrink-0"
                onClick={onEdit}
              >
                <Pencil size={15} />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-muted-foreground/70" />
              {country}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Briefcase size={13} className="text-muted-foreground/70" />
              {role.split(" at ")[0]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} className="text-muted-foreground/70" />
              Joined Build With Her {joinedYear}
            </span>
            <span className="inline-flex items-center gap-1.5 text-primary border border-primary/20 bg-primary/10 rounded-full px-2.5 py-0.5 font-medium">
              <Award size={12} />
              Build With Her Builder
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
