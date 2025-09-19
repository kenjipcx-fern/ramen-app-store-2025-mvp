import axios, { AxiosInstance } from 'axios';
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

export class SlurpClient {
  private http: AxiosInstance;

  constructor(opts: SlurpOptions = {}) {
    this.http = axios.create({ baseURL: opts.baseURL ?? 'https://api.slurp.dev/v1' });
    if (opts.token) this.setToken(opts.token);
  }

  setToken(token: string) {
    this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Profiles
  getMe() { return this.http.get('/me').then(r => r.data as components['schemas']['User']); }
  updateMe(body: components['schemas']['UserUpdate']) { return this.http.put('/me', body).then(r => r.data); }
  getPreferences() { return this.http.get('/me/preferences').then(r => r.data as components['schemas']['Preferences']); }
  updatePreferences(body: components['schemas']['Preferences']) { return this.http.put('/me/preferences', body).then(r => r.data); }

  // Discovery
  listRestaurants(params: Record<string, any>) { return this.http.get('/restaurants', { params }).then(r => r.data as Restaurant[]); }
  getRestaurant(id: string) { return this.http.get(`/restaurants/${id}`).then(r => r.data as Restaurant); }
  getMenu(id: string) { return this.http.get(`/restaurants/${id}/menu`).then(r => r.data as Menu); }

  // Cart & Checkout
  createCart(body: components['schemas']['CartCreateRequest']) { return this.http.post('/cart', body).then(r => r.data as Cart); }
  updateCartItems(body: components['schemas']['CartItemsUpdateRequest']) { return this.http.put('/cart/items', body).then(r => r.data as Cart); }
  getQuote(cartId: string) { return this.http.get('/checkout/quote', { params: { cart_id: cartId } }).then(r => r.data as Quote); }
  submitCheckout(body: components['schemas']['CheckoutSubmitRequest']) { return this.http.post('/checkout/submit', body).then(r => r.data as components['schemas']['CheckoutSubmitResponse']); }

  // Orders
  listOrders() { return this.http.get('/orders').then(r => r.data as Order[]); }
  getOrder(id: string) { return this.http.get(`/orders/${id}`).then(r => r.data as Order); }
  cancelOrder(id: string, reason: string) { return this.http.post(`/orders/${id}/cancel`, { reason }).then(r => r.data); }
  getTracking(id: string) { return this.http.get(`/orders/${id}/tracking`).then(r => r.data as components['schemas']['Tracking']); }

  // Reviews
  createReview(orderId: string, body: components['schemas']['ReviewCreate']) { return this.http.post(`/orders/${orderId}/review`, body).then(r => r.data); }
}

