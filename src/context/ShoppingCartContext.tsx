import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Cart } from "../components/Cart/Cart";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItemsProps = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  openCart: () => void;
  closeCart: () => void;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  getItemQuantity: (id: number) => number;
  itemsQuantity: number;
  cartItems: CartItemsProps[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItemsProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
    openCart();
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id != id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  const itemsQuantity = cartItems?.reduce(
    (total, currentItem) => total + currentItem.quantity,
    0,
  );

  function removeItem(id: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItem,
        getItemQuantity,
        isOpen,
        setIsOpen,
        cartItems,
        itemsQuantity,
      }}
    >
      {children}
      {isOpen && <Cart />}
    </ShoppingCartContext.Provider>
  );
}
