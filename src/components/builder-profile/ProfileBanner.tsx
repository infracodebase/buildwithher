import { Camera } from "lucide-react";

interface ProfileBannerProps {
  bannerUrl: string;
  isOwner: boolean;
  onEdit?: () => void;
}

const ProfileBanner = ({ bannerUrl, isOwner, onEdit }: ProfileBannerProps) => {
  const isDefault = bannerUrl === "/images/build-with-her-background.png";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden group ${isOwner ? "cursor-pointer" : ""}`}
      style={{
        height: "clamp(180px, 20vw, 240px)",
        background:
          "linear-gradient(90deg, #0B2746 0%, #163F63 15%, #8A6A2E 35%, #2E7C5F 55%, #1F6B6E 75%, #1F4F74 100%)",
      }}
      onClick={isOwner ? onEdit : undefined}
    >
      {!isDefault && (
        <img src={bannerUrl} alt="Profile banner" className="w-full h-full object-cover" />
      )}
      {isOwner && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Camera size={18} />
            Change banner
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBanner;
