import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Programs from "./pages/Programs";
import Community from "./pages/Community";
import Events from "./pages/Events";
import MeetTheBuilders from "./pages/MeetTheBuilders";
import JoinTheBuilders from "./pages/JoinTheBuilders";
import MemberWall from "./pages/MemberWall";
import Partners from "./pages/Partners";
import BuilderProfile from "./pages/BuilderProfile";
import NotFound from "./pages/NotFound";
import Manifest from "./pages/Manifest";
import Resources from "./pages/Resources";

const CLERK_PUBLISHABLE_KEY = "pk_test_ZGVsaWNhdGUta29pLTkyLmNsZXJrLmFjY291bnRzLmRldiQ";

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} appearance={{ baseTheme: undefined, variables: { colorBackground: 'hsl(222, 47%, 5%)', colorText: 'hsl(210, 40%, 92%)', colorPrimary: 'hsl(210, 100%, 56%)', colorInputBackground: 'hsl(222, 30%, 14%)', colorInputText: 'hsl(210, 40%, 92%)' } }}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/community" element={<Community />} />
              <Route path="/events" element={<Events />} />
              <Route path="/meet-the-builders" element={<MeetTheBuilders />} />
              <Route path="/join-the-builders" element={<JoinTheBuilders />} />
              <Route path="/member-wall" element={<MemberWall />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/manifest" element={<Manifest />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/builders/:slug" element={<BuilderProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
