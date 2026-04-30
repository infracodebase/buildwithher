import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Compass, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    if (typeof document !== "undefined") {
      let tag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = "robots";
        document.head.appendChild(tag);
      }
      const previous = tag.content;
      tag.content = "noindex, nofollow";
      return () => {
        if (tag) tag.content = previous;
      };
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 gradient-arc pointer-events-none" />
        <div className="container relative z-10 max-w-2xl mx-auto text-center">
          <span className="badge-glow">404 — Page not found</span>

          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text">
            This path hasn't been built yet
          </h1>

          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            The page you're looking for doesn't exist — but you're still in the right community.
            Keep building. Keep exploring. Here's where to go next:
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <GradientButton to="/join-the-builders" size="lg" icon>
              <UserPlus size={16} className="mr-1" />
              Create your builder profile
            </GradientButton>
            <GradientButton to="/meet-the-builders" variant="outline" size="lg">
              <Compass size={16} className="mr-1" />
              Meet the builders
            </GradientButton>
          </div>

          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              <Home size={14} />
              Back to homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;
