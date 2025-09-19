import axios from 'axios';
export class SlurpClient {
    constructor(opts = {}) {
        this.http = axios.create({ baseURL: opts.baseURL ?? 'https://api.slurp.dev/v1' });
        if (opts.token)
            this.setToken(opts.token);
    }
    setToken(token) {
        this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    // Profiles
    getMe() { return this.http.get('/me').then(r => r.data); }
    updateMe(body) { return this.http.put('/me', body).then(r => r.data); }
    getPreferences() { return this.http.get('/me/preferences').then(r => r.data); }
    updatePreferences(body) { return this.http.put('/me/preferences', body).then(r => r.data); }
    // Discovery
    listRestaurants(params) { return this.http.get('/restaurants', { params }).then(r => r.data); }
    getRestaurant(id) { return this.http.get(`/restaurants/${id}`).then(r => r.data); }
    getMenu(id) { return this.http.get(`/restaurants/${id}/menu`).then(r => r.data); }
    // Cart & Checkout
    createCart(body) { return this.http.post('/cart', body).then(r => r.data); }
    updateCartItems(body) { return this.http.put('/cart/items', body).then(r => r.data); }
    getQuote(cartId) { return this.http.get('/checkout/quote', { params: { cart_id: cartId } }).then(r => r.data); }
    submitCheckout(body) { return this.http.post('/checkout/submit', body).then(r => r.data); }
    // Orders
    listOrders() { return this.http.get('/orders').then(r => r.data); }
    getOrder(id) { return this.http.get(`/orders/${id}`).then(r => r.data); }
    cancelOrder(id, reason) { return this.http.post(`/orders/${id}/cancel`, { reason }).then(r => r.data); }
    getTracking(id) { return this.http.get(`/orders/${id}/tracking`).then(r => r.data); }
    // Reviews
    createReview(orderId, body) { return this.http.post(`/orders/${orderId}/review`, body).then(r => r.data); }
}
