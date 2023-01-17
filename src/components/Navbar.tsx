import { useShoppingCartContext } from "../context/ShoppingCartContext";

export const Navbar = () => {
  const { openCart, itemsQuantity } = useShoppingCartContext();

  return (
    <nav className="relative">
      <a
        href="https://github.com/thawansilva/shopping-cart"
        className="text-4xl m-2"
        title="Github Repo"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      <button
        onClick={() => openCart()}
        className="relative float-right p-3 bg-black text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        <p className="absolute select-none bottom-1 right-1 bg-yellow-400 text-black rounded-full w-5 h-5 text-sm">
          {itemsQuantity}
        </p>
      </button>
    </nav>
  );
};
