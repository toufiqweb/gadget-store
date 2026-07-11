import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <FeaturedProducts />
    </div>
  );
}
