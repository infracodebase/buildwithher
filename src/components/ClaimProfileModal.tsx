import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, ArrowRight, Loader2, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ClaimProfileModalProps {
  open: boolean;
  onClose: () => void;
  builderId: string;
  builderName: string;
  onClaimed: () => void;
}

const ClaimProfileModal = ({
  open,
  onClose,
  builderId,
  builderName,
  onClaimed,
}: ClaimProfileModalProps) => {
  const [mode, setMode] = useState<"options" | "email">("options");
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({ title: "Sign in failed", description: String(error) });
        setLoading(false);
      }
      // OAuth will redirect, so we don't need to handle success here
    } catch (err) {
      toast({ title: "Sign in failed", description: "Please try again." });
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({ title: "Sign in failed", description: error.message });
          setLoading(false);
          return;
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast({ title: "Sign up failed", description: error.message });
          setLoading(false);
          return;
        }
        toast({
          title: "Check your email",
          description: "We sent you a confirmation link. Please verify your email, then come back and sign in.",
        });
        setIsLogin(true);
        setLoading(false);
        return;
      }

      // After successful sign-in, link the profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: linkError } = await supabase
          .from("builders")
          .update({ user_id: user.id })
          .eq("id", builderId)
          .is("user_id", null);

        if (linkError) {
          console.error("Link error:", linkError);
          toast({ title: "Could not link profile", description: linkError.message });
        } else {
          toast({ title: "Profile linked!", description: "You can now edit your profile." });
          onClaimed();
        }
      }
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Top accent */}
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg, hsl(210, 100%, 56%), hsl(160, 60%, 45%), hsl(45, 100%, 55%))",
              }}
            />

            {/* Dismiss */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors z-10"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  Edit your profile
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  Create your Infracodebase account to edit and manage your builder profile.
                </p>
              </div>

              {/* Helper text */}
              <div className="rounded-xl bg-secondary/40 border border-border/30 p-3.5 space-y-1.5">
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  Your public profile is already live
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  Authentication is only required to edit and manage it
                </p>
              </div>

              <AnimatePresence mode="wait">
                {mode === "options" ? (
                  <motion.div
                    key="options"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    {/* Google */}
                    <Button
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      variant="outline"
                      className="w-full h-12 rounded-xl gap-3 text-sm font-medium border-border/50 bg-secondary/30 hover:bg-secondary/60 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </Button>

                    {/* Email */}
                    <Button
                      onClick={() => setMode("email")}
                      variant="outline"
                      className="w-full h-12 rounded-xl gap-3 text-sm font-medium border-border/50 bg-secondary/30 hover:bg-secondary/60 transition-all"
                    >
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      Continue with Email
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <button
                      onClick={() => setMode("options")}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      ← Back to sign-in options
                    </button>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10 bg-secondary/50 border-border/50 rounded-xl"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Password</Label>
                        <div className="relative mt-1.5">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pl-10 bg-secondary/50 border-border/50 rounded-xl"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full gap-2 rounded-xl h-11"
                      >
                        {loading ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            {isLogin ? "Sign In" : "Create Account"}
                            <ArrowRight size={16} />
                          </>
                        )}
                      </Button>
                    </form>

                    <div className="text-center">
                      <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs text-primary hover:underline"
                      >
                        {isLogin
                          ? "Don't have an account? Sign up"
                          : "Already have an account? Sign in"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClaimProfileModal;
