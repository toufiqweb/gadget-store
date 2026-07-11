import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TopBrands from "@/components/home/top-brands";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <TopBrands />
      <FeaturedProducts />
    </div>
  );
}

