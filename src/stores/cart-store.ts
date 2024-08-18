import { create } from "zustand";
import { CartItemType } from "../utils/types";

interface CartType {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartType>((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...item, quantity: item.quantity }],
      };
    }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((cartItem) => cartItem.id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      ),
    })),

  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
