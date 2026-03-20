import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "./ThemeProvider";

const CLERK_PUBLISHABLE_KEY = "pk_test_ZGVsaWNhdGUta29pLTkyLmNsZXJrLmFjY291bnRzLmRldiQ";

const darkVariables = {
  colorBackground: 'hsl(222, 47%, 5%)',
  colorText: 'hsl(210, 40%, 92%)',
  colorPrimary: 'hsl(210, 100%, 56%)',
  colorInputBackground: 'hsl(222, 30%, 14%)',
  colorInputText: 'hsl(210, 40%, 92%)',
};

const lightVariables = {
  colorBackground: 'hsl(40, 30%, 97%)',
  colorText: 'hsl(222, 47%, 11%)',
  colorPrimary: 'hsl(210, 100%, 45%)',
  colorInputBackground: 'hsl(220, 14%, 94%)',
  colorInputText: 'hsl(222, 47%, 11%)',
};

const ClerkThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        variables: theme === "dark" ? darkVariables : lightVariables,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkThemeWrapper;
