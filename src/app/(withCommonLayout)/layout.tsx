import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen">
        <Navbar/>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default CommonLayout;