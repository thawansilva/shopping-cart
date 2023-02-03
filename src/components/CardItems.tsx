import { useShoppingCartContext } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/utils";

type StoreItemProps = {
  id: number;
  title: string;
  alt: string;
  imgUrl: string;
  isFreeShipping: boolean;
  price: number;
};

export const CardItems = ({
  imgUrl,
  alt,
  title,
  id,
  isFreeShipping,
  price,
}: StoreItemProps) => {
  const { increaseCartQuantity } = useShoppingCartContext();

  return (
    <>
      <div className="relative w-[185px] mt-4 text-center mx-auto">
        <img
          className="w-[185px] h-[275px] object-cover object-top"
          src={imgUrl}
          alt={alt}
          loading="lazy"
        />
        <h4 className="my-2">{title}</h4>
        <p className="font-bold mb-3">{formatCurrency(price)}</p>
        <button
          onClick={() => increaseCartQuantity(id)}
          className="w-full p-2 bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
          title="Add to Cart"
        >
          Add to Cart
        </button>
        {isFreeShipping && (
          <p className="absolute top-0 right-0 text-xs bg-yellow-500  p-1 w-3/5">
            Free Shipping
          </p>
        )}
      </div>
    </>
  );
};
