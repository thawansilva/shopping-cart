import { createContext, ReactNode, useContext, useState } from "react";
import { Cart } from "../components/Cart/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItemsProps = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  isOpen: boolean;
  setIsOpen(state: boolean): void;
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
  const [cartItems, setCartItems] = useLocalStorage<CartItemsProps[]>(
    "shopping-cart",
    [],
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      const newItemInTheCart =
        currentItems.find((item) => item.id === id) == null;

      if (newItemInTheCart) {
        return [...currentItems, { id, quantity: 1 }];
      }
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    });
    openCart();
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      const hasOneItem =
        currentItems.find((item) => item.id === id)?.quantity === 1;

      if (hasOneItem) {
        return currentItems.filter((item) => item.id !== id);
      }

      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      });
    });
  }

  function removeItem(id: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  const itemsQuantity = cartItems?.reduce(
    (total, currentItem) => total + currentItem.quantity,
    0,
  );

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
