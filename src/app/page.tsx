import Image from "next/image";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import AllProducts from "./_components/AllProducts/AllProducts";
import Footer from "./_components/Footer/page";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <AllProducts />
    </>
  );
}
