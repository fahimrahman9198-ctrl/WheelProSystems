// Mock Stripe — demo-mode payment processing. No real API calls.

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

export type PaymentResult =
  | { success: true; paymentIntentId: string }
  | { success: false; error: string; code: string };

// ── Test card definitions ─────────────────────────────────────────────────────

const TEST_CARDS: Record<string, { result: 'success' | 'decline' | 'insufficient'; message?: string }> = {
  '4242424242424242': { result: 'success' },
  '4000000000000002': { result: 'decline',      message: 'Your card was declined.' },
  '4000000000009995': { result: 'insufficient', message: 'Insufficient funds on this card.' },
  '4000000000000069': { result: 'decline',      message: 'Your card has expired.' },
};

// ── Card brand detection ──────────────────────────────────────────────────────

export function detectBrand(number: string): CardBrand {
  const n = number.replace(/\s/g, '');
  if (/^4/.test(n))           return 'visa';
  if (/^5[1-5]/.test(n))     return 'mastercard';
  if (/^2[2-7]/.test(n))     return 'mastercard';
  if (/^3[47]/.test(n))      return 'amex';
  return 'unknown';
}

// ── Luhn check ────────────────────────────────────────────────────────────────

export function luhnCheck(number: string): boolean {
  const digits = number.replace(/\s/g, '').split('').reverse().map(Number);
  const sum = digits.reduce((acc, d, i) => {
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    return acc + d;
  }, 0);
  return sum % 10 === 0;
}

// ── Format helpers ────────────────────────────────────────────────────────────

export function formatCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  if (digits.length === 2) return digits;
  return digits;
}

// ── Mock payment processor ────────────────────────────────────────────────────

export async function processDemoPayment(
  cardNumber: string,
  _amount: number
): Promise<PaymentResult> {
  // Simulate network latency
  await new Promise(r => setTimeout(r, 2400));

  const clean = cardNumber.replace(/\s/g, '');
  const test  = TEST_CARDS[clean];

  if (test) {
    if (test.result !== 'success') {
      return { success: false, error: test.message ?? 'Payment failed.', code: test.result };
    }
    return { success: true, paymentIntentId: `pi_demo_${Date.now()}` };
  }

  // Unknown cards succeed in demo mode (except obviously invalid)
  if (clean.length !== 16) {
    return { success: false, error: 'Invalid card number.', code: 'invalid_number' };
  }
  return { success: true, paymentIntentId: `pi_demo_${Date.now()}` };
}

// ── Validation ────────────────────────────────────────────────────────────────

export function validateExpiry(expiry: string): string | null {
  const match = expiry.replace(/\s/g, '').match(/^(\d{2})\/(\d{2})$/);
  if (!match) return 'Enter expiry as MM / YY';
  const [, mm, yy] = match;
  const month = parseInt(mm, 10);
  if (month < 1 || month > 12) return 'Invalid month';
  const now = new Date();
  const cardYear = 2000 + parseInt(yy, 10);
  const cardMonth = month;
  if (cardYear < now.getFullYear() || (cardYear === now.getFullYear() && cardMonth < now.getMonth() + 1))
    return 'Card has expired';
  return null;
}
