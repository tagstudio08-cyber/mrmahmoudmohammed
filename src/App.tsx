import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import Qudurat from "./pages/Qudurat.tsx";
import Tahsili from "./pages/Tahsili.tsx";
import ImamUniversity from "./pages/ImamUniversity.tsx";
import FollowUp from "./pages/FollowUp.tsx";
import QuduratQuestions from "./pages/QuduratQuestions.tsx";
import MathSubjects from "./pages/MathSubjects.tsx";
import Results from "./pages/Results.tsx";
import Reviews from "./pages/Reviews.tsx";
import ServicePageLayout from "@/components/ServicePageLayout";
import { servicePages } from "@/data/servicePages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/qudurat" element={<Qudurat />} />
          <Route path="/tahsili" element={<Tahsili />} />
          <Route path="/imam-university-math" element={<ImamUniversity />} />
          <Route path="/follow-up" element={<FollowUp />} />
          <Route path="/qudurat-questions" element={<QuduratQuestions />} />
          <Route path="/math-subjects" element={<MathSubjects />} />
          <Route path="/results" element={<Results />} />
          <Route path="/reviews" element={<Reviews />} />
          {servicePages.map((p) => (
            <Route key={p.slug} path={`/${p.slug}`} element={<ServicePageLayout {...p} />} />
          ))}
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
