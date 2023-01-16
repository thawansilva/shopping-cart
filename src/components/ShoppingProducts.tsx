import storeItems from "../../data/items.json";
import { useFilterContext } from "../context/FilterContext";
import { CardItems } from "./CardItems";

const ShoppingProducts = () => {
  const { sizes } = useFilterContext();
  return (
    <>
      <div className="grid gap-1 grid-cols-2 my-6 lg:grid-cols-4 lg:gap-5 w-full mx-auto">
        {sizes?.length === 0
          ? storeItems.map((item, index) => {
              return <CardItems {...item} key={index} />;
            })
          : storeItems
              .filter((i) => {
                return sizes?.find((size: string) =>
                  i.availableSizes.find((s) => s === size),
                );
              })
              .map((item, index) => {
                return <CardItems {...item} key={index} />;
              })}
      </div>
    </>
  );
};

export default ShoppingProducts;
