import type { DetailOrder, Order } from "../../../@types/order";
import api from "../../../app/api/api";

interface ResGetAllOrders {
    orders: Order[] & { user: { name: string }[] },
    pagination: { page: string, limit: string, search: string },
    message: string;
}

export async function getAllOrders(page: number, limit?: number, search?: string) {
    return await api.get<ResGetAllOrders>("orders", { params: { page, limit, search } });
}

export async function getDetailOrder(id: string) {
    return await api.get<DetailOrder[]>(`orders/${id}`);
}

export async function changeStatusOrder(id: string, status: string) {
    return await api.put(`orders/${id}/status`, { status });
}

export async function getOrderByUser(userId: string) {
    return await api.get<Order[]>(`orders/user`);
}

