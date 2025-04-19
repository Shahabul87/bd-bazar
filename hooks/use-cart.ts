"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string | null;
  quantity: number;
}

export const useCart = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (data: CartItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === data.id);
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === data.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, data],
          };
        });
      },
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
); 