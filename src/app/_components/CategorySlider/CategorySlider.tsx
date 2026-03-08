import getAllcategories from "@/api/getAllcategories.api";
import React from "react";
import CateggorySwipper from "../CategorySwipper/CateggorySwipper";


export default async function CategorySlider() {
  const { data } = await getAllcategories();
  return (
    <>
      <CateggorySwipper data = {data} />
    </>
  );
}
