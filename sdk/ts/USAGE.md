# Slurp TypeScript SDK — Usage

Install (local build)
- Generate types: npx openapi-typescript ../openapi.yaml -o src/types.ts
- Build: npm run build

Example
```ts
import { SlurpClient } from 'slurp-sdk';

const client = new SlurpClient({ baseURL: 'https://api.slurp.dev/v1' });
client.setToken('YOUR_JWT');

// List restaurants near SF
const restaurants = await client.listRestaurants({ lat: 37.7749, lng: -122.4194, sort: 'overall' });

// Create a cart and add an item
const cart = await client.createCart({ restaurant_id: 'rest_ichiba', address_id: 'addr_123' });
await client.updateCartItems({
  cart_id: cart.id,
  operations: [{
    op: 'add',
    item: {
      menu_item_id: 'item_tonkotsu',
      quantity: 1,
      separation: true,
      modifiers: [
        { modifier_group_id: 'firmness', modifier_id: 'hard' },
        { modifier_group_id: 'spice', modifier_id: '2' }
      ]
    }
  }]
});

// Quote and submit
const quote = await client.getQuote(cart.id);
const orderRes = await client.submitCheckout({ cart_id: cart.id, payment_method_id: 'pm_123', tip: 0.15 });
console.log(orderRes.order.id);
```

