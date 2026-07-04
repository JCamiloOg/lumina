import { createContext } from "react";
import type { Product } from "../../@types/product";

interface CartContextType {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    cart: (Product & {
        quantity: number;
    })[],
    addToCart: (product: Product) => void,
    removeFromCart: (id: number) => void,
    clearCart: () => void,
    less: (id: number) => void,
    plus: (id: number) => void,
}


const CartContext = createContext<CartContextType | null>(null);

export default CartContext;