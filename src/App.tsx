import { lazy, Suspense } from "react";
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
import NotFound from "./pages/NotFound";

// Code-split heavier or secondary routes so the landing page bundle stays small.
const Programs = lazy(() => import("./pages/Programs"));
const Community = lazy(() => import("./pages/Community"));
const Events = lazy(() => import("./pages/Events"));
const MeetTheBuilders = lazy(() => import("./pages/MeetTheBuilders"));
const JoinTheBuilders = lazy(() => import("./pages/JoinTheBuilders"));
const MemberWall = lazy(() => import("./pages/MemberWall"));
const Partners = lazy(() => import("./pages/Partners"));
const BuilderProfile = lazy(() => import("./pages/BuilderProfile"));
const Manifest = lazy(() => import("./pages/Manifest"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background" aria-busy="true" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ClerkThemeWrapper>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
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
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ClerkThemeWrapper>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
