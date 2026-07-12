import LatestArrivals from "@/components/home/LatestArrivals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanners from "@/components/home/PromoBanners";
import CustomerReviews from "@/components/home/CustomerReviews";
import ShopByCategory from "@/components/home/ShopByCategory";
import OfferBanners from "@/components/home/OfferBanners";
import Newsletter from "@/components/home/Newsletter";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import TopBrands from "@/components/home/top-brands";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex flex-col gap-[30px] md:gap-[70px] pb-[30px] md:pb-[70px]">
      <div>
        <Hero />
        <Stats />
      </div>
      <FeaturedProducts />
      <OfferBanners />
      <ShopByCategory />
      <TopBrands />
      <PromoBanners />
      <CustomerReviews />
      <LatestArrivals />
      <Newsletter />
    </div>
  );
}
