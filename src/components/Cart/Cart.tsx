import storeItems from "../../../data/items.json";
import { useShoppingCartContext } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/utils";
import { Items } from "./Items";

type CartItemProps = {
  id: number;
  quantity: number;
};

export const Cart = () => {
  const { closeCart, cartItems, itemsQuantity } = useShoppingCartContext();
  const subtotal = cartItems?.reduce(
    (total: number, currentItem: CartItemProps) => {
      const item = storeItems.find((i) => i.id === currentItem.id);
      return total + (item?.price || 0) * currentItem.quantity;
    },
    0,
  );
  return (
    <div className="fixed top-0 right-0 w-[100vw] px-3 md:px-0 md:w-[60vw] h-[100vh] bg-gray-900 z-20 text-gray-100 lg:w-[40vw]">
      <button
        className="float-right mr-4 mt-2"
        onClick={closeCart}
        title="Close Cart"
        tabIndex={-1}
      >
        <i className="fa-solid fa-x"></i>
      </button>
      <div className="relative h-[10vh] text-center mt-8 flex justify-center align-center">
        <button disabled className="p-2 mr-1 text-white mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 relative"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <p className="absolute select-none bottom-5 ml-4 bg-yellow-400 text-black rounded-full w-5 h-5 text-sm">
            {itemsQuantity}
          </p>
        </button>
        <h3 className="text-center text-3xl">Cart</h3>
      </div>
      <div className=" mx-3 my-4 py-4 h-[60vh] overflow-auto scrollbar">
        {cartItems.length === 0 && (
          <p className="text-center text-lg">Add some products in the cart</p>
        )}

        {cartItems?.map((currentItem: CartItemProps, index: number) => (
          <Items {...currentItem} key={index} />
        ))}
      </div>
      <div className="absolute bg-gray-700 bottom-0 px-3 w-full h-[20vh] flex justify-between items-center">
        <p className="text-2xl font-bold">Subtotal:</p>
        <div>
          <span className="text-xl block ">{formatCurrency(subtotal)}</span>
          {subtotal && (
            <span className="pr-3">
              or{" "}
              {subtotal < 200
                ? `6x of ${formatCurrency(subtotal / 6)}`
                : `12x of ${formatCurrency(subtotal / 6)}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
