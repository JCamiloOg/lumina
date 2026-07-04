
export const StatusOrder = {
    Pendiente: 'Pendiente',
    Aprobado: 'Aprobado',
    Rechazado: 'Rechazado',
    Enviado: 'Enviado',
    Entregado: 'Entregado'
} as const;

export type StatusOrder = (typeof StatusOrder)[keyof typeof StatusOrder];

export interface Order {
    id: string;
    user_id: string;
    status: StatusOrder;
    total: number;
    createdAt: string;
}

export interface DetailOrder {
    order_id: string;
    product_id: number;
    quantity: number;
    unit_price: number;
    subtotal: number;
    product: {
        name: string;
        image_url: string;
    };
}

