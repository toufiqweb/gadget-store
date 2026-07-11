import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import NotFoundComponent from "@/components/shared/NotFoundComponent";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--primary)]">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        <NotFoundComponent />
      </main>
      <Footer />
    </div>
  );
}
