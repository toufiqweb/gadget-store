import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen">
        <Navbar/>
        {children}</main>
    </>
  );
};

export default CommonLayout;