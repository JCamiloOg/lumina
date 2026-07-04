export interface Product {
    name: string;
    id: number;
    createdAt: string;
    status: boolean;
    description: string;
    price: Decimal;
    image_url: string;
}