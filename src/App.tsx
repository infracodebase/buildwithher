import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClerkThemeWrapper from "@/components/ClerkThemeWrapper";
import ScrollToTop from "@/components/ScrollToTop";
import SSOCallback from "@/components/SSOCallback";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ClerkThemeWrapper>
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
              <Route path="/resources" element={<Navigate to="/" replace />} />
              <Route path="/builders/:slug" element={<BuilderProfile />} />
              <Route path="/sso-callback" element={<SSOCallback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ClerkThemeWrapper>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
