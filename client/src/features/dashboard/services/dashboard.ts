import api from "../../../app/api/api";

export interface DashboardSummary {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    ordersByStatus: { status: string; count: number }[];
}

export async function getDashboardSummary() {
    return await api.get<DashboardSummary>("/dashboard");
}
