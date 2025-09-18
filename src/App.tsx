import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsTracker from '@/components/AnalyticsTracker';
import HoveringNavbar from "./components/HoveringNavbar";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";
import CustomCursor from "./components/CustomCursor";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Ideas from "./pages/Ideas";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import FindYourStyle from "./pages/FindYourStyle";
import NotFound from "./pages/NotFound";
import IndependenceSplash from "./components/IndependenceSplash";
import DynamicLoader from "./components/DynamicLoader";
import EstimatorFlow from "./components/estimator/EstimatorFlow";


 
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker/>
        <DynamicLoader />
        <IndependenceSplash />
        <CustomCursor />
        <HoveringNavbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail/>} />
          <Route path="/services" element={<Services />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/find-your-style" element={<FindYourStyle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <AIAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

