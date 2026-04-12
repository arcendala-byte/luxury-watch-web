# Paystack Payment Integration

## Environment Variables

Add these to your `.env.local`:

```env
PAYSTACK_SECRET_KEY=sk_test_xxxxxx
PAYSTACK_WEBHOOK_SECRET=your_paystack_webhook_secret
NEXT_PUBLIC_PAYSTACK_SECRET_KEY=sk_test_xxxxxx
```

Get these from your Paystack Dashboard: https://dashboard.paystack.com/settings/api-keys

## Endpoint Usage

### Create and Pay for an Order

1. **Create an order** via `POST /api/orders` with:
   ```json
   {
     "userId": 1,
     "cartItems": [
       { "productId": 1, "quantity": 2 },
       { "productId": 2, "quantity": 1 }
     ]
   }
   ```
   This returns `{ order: { id: 123, ... } }`.

2. **Initiate checkout** with `POST /api/checkout` containing:
   ```json
   { "orderId": 123 }
   ```
   This redirects to Paystack's payment page.

3. **Test payment** using Paystack test card:
   - Card: `4111 1111 1111 1111`
   - Expiry: Any future date
   - CVV: Any 3 digits

4. **Webhook** (`POST /api/checkout` with Paystack signature header):
   - On `charge.success`, updates order status to "paid".
   - Configure webhook URL in Paystack dashboard: `https://yourdomain.com/api/checkout`

## Files Added

- `src/app/api/checkout/route.ts` – Paystack transaction initialization + webhook handling
- `src/app/verify-payment/page.tsx` – Payment verification and confirmation page
- `src/app/success/page.tsx` – Success confirmation page (legacy)
- `src/app/cancel/page.tsx` – Cancellation page (legacy)

## Local Testing

1. Set up Paystack test keys in `.env.local`
2. Create an order via `/api/orders`
3. POST `{ "orderId": ... }` to `/api/checkout`
4. Use Paystack test card to complete payment
5. Verify webhook is received in Paystack dashboard

## Payment Flow

1. Create order via `POST /api/orders` → receive `orderId`
2. POST `{ "orderId" }` to `/api/checkout` → redirected to Paystack
3. User completes payment with test/real card
4. Paystack redirects to `/verify-payment?reference=...`
5. Frontend verifies payment with Paystack API
6. On success, order status updated to "paid" via webhook
7. User sees confirmation page

