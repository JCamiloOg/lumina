import type { Product } from "../../../@types/product";
import api from "../../../app/api/api";

type ResProduct = {
    message: string,
    products: Product[],
    pagination: { page: number, limit: number, totalPages: number }
}

export async function getProducts(page?: string, limit?: string, search?: string, status?: boolean) {
    return await api.get<ResProduct>("/products", { params: { page, limit, search, status } });
}


export async function createProduct(product: Omit<Product, "createdAt" | "id" | "status">) {
    return await api.post<{
        message: string,
        product: Product
    }>("/products", product);
}


export async function updateProduct(id: number, product: Omit<Product, "createdAt">) {
    return await api.put<{
        message: string,
        product: Product
    }>(`/products/${id}`, product);
}

export async function deleteProduct(id: number) {
    return await api.delete<{ message: string }>(`/products/${id}`);
}
