import storeItems from "../../../data/items.json";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/utils";

type CartItemsProps = {
  id: number;
  quantity: number;
};

export const Items = ({ id, quantity }: CartItemsProps) => {
  const { removeItem, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCartContext();

  const item = storeItems.find((item) => item.id === id);
  if (!item) {
    return null;
  }
  let currentText = "";
  item.availableSizes.map((size, index) => {
    {
      index !== item.availableSizes.length - 1
        ? (currentText += `${size}, `)
        : (currentText += `${size}.`);
    }
  });

  return (
    <div className="flex gap-3 justify-between align-center border-t-2 pt-4 mb-2 border-t-gray-600 h-[150px] mr-2">
      <img
        className="w-[100px] select-none h-32 object-cover object-center"
        src={item.imgUrl}
        alt={item.alt}
      />
      <div className="grow">
        <div>
          <p className="text-yellow-500">{item.title}</p>
          <span className="block mt-1 text-sm">Sizes: {currentText}</span>
          <span className="block mt-3">{formatCurrency(item.price)}</span>
          <span className="block mt-1 text-sm">Quantity: {quantity}</span>
        </div>
      </div>
      <div>
        <button
          onClick={() => removeItem(id)}
          title="Remove item from the cart"
          className="float-right select-none text-black font-bold hover:text-gray-200"
        >
          X
        </button>
        <p className="my-3 text-yellow-500">
          {formatCurrency(item.price * quantity)}
        </p>
        <div className="flex float-right">
          <button
            {...(quantity == 1 && {
              disabled: true,
              style: { backgroundColor: "#808080" },
            })}
            title="Decrease quantity"
            onClick={() => decreaseCartQuantity(id)}
            className="h-6 w-6 bg-black select-none"
          >
            -
          </button>
          <button
            onClick={() => increaseCartQuantity(id)}
            className="h-6 w-6 bg-black select-none"
            title="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
