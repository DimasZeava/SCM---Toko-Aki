import { Config } from 'ziggy-js';
import { PageProps as InertiaPageProps } from '@inertiajs/inertia';

export interface User {
    id: number;
    name: string;
    roles: string[];
    email: string;
    email_verified_at?: string;
}

export interface Order {
    id: number;
    product_id: number;
    quantity: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    csrf_token: string;
    products: Product[];
    orders?: any[];
};
