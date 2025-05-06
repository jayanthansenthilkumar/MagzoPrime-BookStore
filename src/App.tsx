import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Bestsellers from "./pages/Bestsellers";
import NewReleases from "./pages/NewReleases";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import CategoryDetail from "./pages/CategoryDetail";
import GenreDetail from "./pages/GenreDetail";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Customer-facing routes */}
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryDetail />} />
          <Route path="/genre/:slug" element={<GenreDetail />} />
          <Route path="/bestsellers" element={<Bestsellers />} />
          <Route path="/new-releases" element={<NewReleases />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />

          {/* Admin routes */}
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/books" element={<AdminBooks />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
