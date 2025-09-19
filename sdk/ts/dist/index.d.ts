import type { components } from './types';
export type Order = components['schemas']['Order'];
export type Menu = components['schemas']['Menu'];
export type Restaurant = components['schemas']['Restaurant'];
export type Cart = components['schemas']['Cart'];
export type Quote = components['schemas']['Quote'];
export interface SlurpOptions {
    baseURL?: string;
    token?: string;
}
export declare class SlurpClient {
    private http;
    constructor(opts?: SlurpOptions);
    setToken(token: string): void;
    getMe(): Promise<{
        id?: string;
        email?: string;
        phone?: string;
        name?: string;
        role?: "customer" | "owner" | "manager" | "staff";
        created_at?: string;
    }>;
    updateMe(body: components['schemas']['UserUpdate']): Promise<any>;
    getPreferences(): Promise<{
        noodle_firmness?: "soft" | "regular" | "hard" | "extra_hard";
        spice_level?: number;
        oil_richness?: "light" | "regular" | "rich";
        broth_temperature?: "hot" | "extra_hot";
        dietary?: ("none" | "vegetarian" | "vegan" | "halal")[];
    }>;
    updatePreferences(body: components['schemas']['Preferences']): Promise<any>;
    listRestaurants(params: Record<string, any>): Promise<{
        id?: string;
        name?: string;
        description?: string;
        hours?: {
            [key: string]: unknown;
        };
        location?: {
            lat?: number;
            lng?: number;
        };
        supports_separation?: boolean;
        firmness_options?: string[];
        facet_ratings?: components["schemas"]["RestaurantCard"]["ratings"];
    }[]>;
    getRestaurant(id: string): Promise<{
        id?: string;
        name?: string;
        description?: string;
        hours?: {
            [key: string]: unknown;
        };
        location?: {
            lat?: number;
            lng?: number;
        };
        supports_separation?: boolean;
        firmness_options?: string[];
        facet_ratings?: components["schemas"]["RestaurantCard"]["ratings"];
    }>;
    getMenu(id: string): Promise<{
        categories?: {
            id?: string;
            name?: string;
            items?: components["schemas"]["MenuItem"][];
        }[];
    }>;
    createCart(body: components['schemas']['CartCreateRequest']): Promise<{
        id?: string;
        restaurant_id?: string;
        items?: components["schemas"]["CartLineItem"][];
        subtotal?: number;
        fees?: components["schemas"]["Fees"];
        tax?: number;
        tip?: number;
        total?: number;
    }>;
    updateCartItems(body: components['schemas']['CartItemsUpdateRequest']): Promise<{
        id?: string;
        restaurant_id?: string;
        items?: components["schemas"]["CartLineItem"][];
        subtotal?: number;
        fees?: components["schemas"]["Fees"];
        tax?: number;
        tip?: number;
        total?: number;
    }>;
    getQuote(cartId: string): Promise<{
        cart_id?: string;
        fees?: components["schemas"]["Fees"];
        tax?: number;
        tip_suggestions?: number[];
        eta_minutes_p50?: number;
        eta_minutes_p90?: number;
    }>;
    submitCheckout(body: components['schemas']['CheckoutSubmitRequest']): Promise<{
        order?: components["schemas"]["Order"];
        stripe_client_secret?: string | null;
    }>;
    listOrders(): Promise<{
        id?: string;
        user_id?: string;
        restaurant_id?: string;
        status?: "CREATED" | "PAYMENT_AUTH_PENDING" | "CONFIRMED" | "PREPARING" | "READY_FOR_PICKUP" | "DRIVER_ASSIGNED" | "PICKED_UP" | "ARRIVING" | "DELIVERED" | "CANCELED" | "FAILED" | "PARTIALLY_REFUNDED" | "REFUNDED";
        items?: components["schemas"]["OrderItem"][];
        fees?: components["schemas"]["Fees"];
        tax?: number;
        tip?: number;
        total?: number;
        schedule_time?: string | null;
        created_at?: string;
    }[]>;
    getOrder(id: string): Promise<{
        id?: string;
        user_id?: string;
        restaurant_id?: string;
        status?: "CREATED" | "PAYMENT_AUTH_PENDING" | "CONFIRMED" | "PREPARING" | "READY_FOR_PICKUP" | "DRIVER_ASSIGNED" | "PICKED_UP" | "ARRIVING" | "DELIVERED" | "CANCELED" | "FAILED" | "PARTIALLY_REFUNDED" | "REFUNDED";
        items?: components["schemas"]["OrderItem"][];
        fees?: components["schemas"]["Fees"];
        tax?: number;
        tip?: number;
        total?: number;
        schedule_time?: string | null;
        created_at?: string;
    }>;
    cancelOrder(id: string, reason: string): Promise<any>;
    getTracking(id: string): Promise<{
        order_id?: string;
        status?: components["schemas"]["Order"]["status"];
        driver?: {
            assigned?: boolean;
            eta_minutes?: number;
            location?: {
                lat?: number;
                lng?: number;
            } | null;
        };
    }>;
    createReview(orderId: string, body: components['schemas']['ReviewCreate']): Promise<any>;
}
