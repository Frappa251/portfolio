import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import NotFound from "@/pages/NotFound";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-white">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
