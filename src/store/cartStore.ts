import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItemType {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    config?: {
        frameLabel: string;
        plasticLabel: string;
        tiresLabel: string;
    };
    stats?: {
        weight: string;
        speed: string;
        cooling: string;
    };
}

interface CartStore {
    items: CartItemType[];
    addItem: (item: CartItemType) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, amount: number) => void;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => set((state) => {
                const existingItem = state.items.find(i => i.id === item.id);
                if (existingItem) {
                    return {
                        items: state.items.map(i =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        )
                    };
                }
                return { items: [...state.items, item] };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id)
            })),

            updateQuantity: (id, amount) => set((state) => ({
                items: state.items.map(i => {
                    if (i.id === id) {
                        const newQuantity = Math.max(1, i.quantity + amount);
                        return { ...i, quantity: newQuantity };
                    }
                    return i;
                })
            })),

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            }
        }),
        {
            name: 'cheetah-cart',
        }
    )
);