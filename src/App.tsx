import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedAdminRoute from "@/components/admin/ProtectedAdminRoute";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { ServicesProvider } from "@/context/ServicesContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AdminLoginPage from "./pages/AdminLoginPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <ServicesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminPage />
                  </ProtectedAdminRoute>
                }
              />
              <Route path="/services/:module/:slug" element={<ServicePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ServicesProvider>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
