import type { Order } from "../../../@types/order";
import api from "../../../app/api/api";


export async function createOrder(order: { idProduct: number, quantity: number, name: string }[]) {
    return await api.post<{ message: string, order: Order }>("/orders", { cart: order });
}