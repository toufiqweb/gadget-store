import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Gadget Store — Latest Tech & Electronics",
  description:
    "Your ultimate destination for cutting-edge technology. Explore phones, laptops, cameras, drones, gaming gear, and more.",
  keywords: ["gadgets", "electronics", "phones", "laptops", "cameras", "tech store", "online shopping"],
  openGraph: {
    title: "Gadget Store — Latest Tech & Electronics",
    description:
      "Explore our collection of cutting-edge gadgets and gear. Phones, cameras, drones, wearables, gaming and more.",
    type: "website",
    siteName: "Gadget Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gadget Store — Latest Tech & Electronics",
    description: "Explore cutting-edge gadgets and tech gear at Gadget Store.",
  },
};



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