import { SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AuthGateModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

const AuthGateModal = ({
  open,
  onClose,
  title = "Sign in to continue",
  subtitle = "Create an account or sign in to manage your builder profile.",
}: AuthGateModalProps) => {
  const { theme } = useTheme();
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
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg, hsl(210, 100%, 56%), hsl(160, 60%, 45%), hsl(45, 100%, 55%))",
              }}
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors z-10"
            >
              <X size={16} />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2.5">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {subtitle}
                </p>
              </div>

              <div className="flex justify-center [&_.cl-rootBox]:w-full [&_.cl-card]:bg-transparent [&_.cl-card]:shadow-none [&_.cl-card]:border-none [&_.cl-headerTitle]:hidden [&_.cl-headerSubtitle]:hidden [&_.cl-socialButtonsBlockButton]:rounded-xl [&_.cl-socialButtonsBlockButton]:h-12 [&_.cl-socialButtonsBlockButton]:border-border/50 [&_.cl-socialButtonsBlockButton]:bg-secondary/30 [&_.cl-formButtonPrimary]:bg-primary [&_.cl-formButtonPrimary]:rounded-xl [&_.cl-formFieldInput]:rounded-xl [&_.cl-formFieldInput]:bg-secondary/50 [&_.cl-formFieldInput]:border-border/50 [&_.cl-footer]:hidden [&_.cl-internal-b3fm6y]:hidden">
                <SignUp
                  appearance={{
                    baseTheme: theme === "dark" ? dark : undefined,
                    variables: {
                      colorBackground: 'transparent',
                      colorText: theme === "dark" ? 'hsl(210, 40%, 92%)' : 'hsl(222, 47%, 11%)',
                      colorPrimary: theme === "dark" ? 'hsl(210, 100%, 56%)' : 'hsl(210, 100%, 45%)',
                      colorInputBackground: theme === "dark" ? 'hsl(222, 30%, 14%)' : 'hsl(220, 14%, 94%)',
                      colorInputText: theme === "dark" ? 'hsl(210, 40%, 92%)' : 'hsl(222, 47%, 11%)',
                      colorTextSecondary: theme === "dark" ? 'hsl(215, 20%, 55%)' : 'hsl(215, 16%, 47%)',
                    },
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-none p-0",
                    },
                  }}
                  forceRedirectUrl={window.location.pathname}
                  signInForceRedirectUrl={window.location.pathname}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthGateModal;
