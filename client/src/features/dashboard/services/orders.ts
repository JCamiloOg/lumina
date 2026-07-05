import type { DetailOrder, Order } from "../../../@types/order";
import api from "../../../app/api/api";

interface ResGetOrders {
    orders: (Order & { user: { name: string } })[],
    pagination: { page: string, limit: string, totalPages: number },
    message: string;
}

export async function getAllOrders(page: number, limit?: number, search?: string) {
    return await api.get<ResGetOrders>("orders", { params: { page, limit, search } });
}

export async function getDetailOrder(id: string) {
    return await api.get<{ orderDetails: DetailOrder[] }>(`orders/${id}`);
}

export async function changeStatusOrder(id: string, status: string) {
    return await api.put(`orders/${id}/status`, { status });
}

export async function getOrderByUser() {
    return await api.get<ResGetOrders>(`orders/user`);
}

