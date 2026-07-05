import { useEffect, useState } from "react";
import CartContext from "../../shared/context/cart.context";
import type { Product } from "../../@types/product";
import { Toast } from "../../features/landing/components/alerts";
import { useUser } from "../../shared/hooks/useUserContext";


export default function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<(Product & { quantity: number })[]>(() => {
        const cartStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [];
        return cartStorage;
    });
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { user } = useUser();


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: (Product)) => {
        if (!user) {
            Toast.fire({
                icon: "error",
                title: "Debes iniciar sesión para añadir productos al carrito",
                timer: 2000
            });
            return;
        }

        const isExist = cart.find((item) => item.id === product.id);
        if (isExist) {
            setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));

            Toast.fire({
                icon: "warning",
                title: "Producto ya existe en el carrito, se ha añadido uno mas",
                timer: 2000
            });
            return;
        }

        setCart([...cart, { ...product, quantity: 1 }]);
        Toast.fire({
            icon: "success",
            title: "Producto añadido al carrito",
            timer: 2000
        });
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter((product) => product.id !== id));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
        setIsOpen(false);
    };

    const less = (id: number) => {
        setCart(cart.map((product) => product.id === id ? { ...product, quantity: product.quantity - 1 } : product));
    };

    const plus = (id: number) => {
        setCart(cart.map((product) => product.id === id ? { ...product, quantity: product.quantity + 1 } : product));
    };

    useEffect(() => {
        const cartStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [];
        // eslint-disable-next-line
        setCart(cartStorage);
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, less, plus, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
}