import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/30 bg-background">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">Build with Her</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            A community for women and the allies who champion them in Cloud, AI, and Infrastructure.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Built by{" "}
            <a
              href="https://oz.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-medium hover:underline"
            >
              Oz
            </a>
          </p>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-muted-foreground">Community</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/programs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Programs</Link>
            <Link to="/events" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Events</Link>
            <Link to="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link>
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-muted-foreground">Connect</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/meet-the-builders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Builders</Link>
            <Link to="/member-wall" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Member Wall</Link>
            <Link to="/partners" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Partners</Link>
          </div>
        </div>
        <div className="md:col-span-3">
          <h4 className="font-display font-semibold text-xs uppercase tracking-wider mb-4 text-muted-foreground">Resources</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/programs#university" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Oz University</Link>
            <Link to="/programs#workshops" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Workshops</Link>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Build with Her. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">Cloud • AI • Infrastructure</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
