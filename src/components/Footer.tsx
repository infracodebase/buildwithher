import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-background">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <span className="font-display text-lg font-bold gradient-text">Build with Her</span>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            A global community for women learning, building, and growing in Cloud, AI, and Infrastructure.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Powered by <span className="text-foreground font-medium">Infracodebase</span>
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Community</h4>
          <div className="flex flex-col gap-2">
            <Link to="/programs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Programs</Link>
            <Link to="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Events</Link>
            <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Connect</h4>
          <div className="flex flex-col gap-2">
            <Link to="/meet-the-builders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Meet the Builders</Link>
            <Link to="/member-wall" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Member Wall</Link>
            <Link to="/partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Partners</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Resources</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Infracodebase University</span>
            <span className="text-sm text-muted-foreground">1:1 Sessions</span>
            <span className="text-sm text-muted-foreground">Workshops</span>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Build with Her. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
