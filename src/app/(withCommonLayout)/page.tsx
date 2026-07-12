import LatestArrivals from "@/components/home/LatestArrivals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanners from "@/components/home/PromoBanners";
import CustomerReviews from "@/components/home/CustomerReviews";
import ShopByCategory from "@/components/home/ShopByCategory";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import TopBrands from "@/components/home/top-brands";

export default async function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <FeaturedProducts />
      <TopBrands />
      <ShopByCategory />
      <PromoBanners />
      <CustomerReviews />
      <LatestArrivals />
    </div>
  );
}
