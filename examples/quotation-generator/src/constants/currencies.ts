import type { Currency } from '../types/quote.types';

export const CURRENCIES: { value: Currency; label: string; symbol: string }[] = [
  { value: 'INR', label: 'Indian Rupee (₹)', symbol: '₹' },
  { value: 'USD', label: 'US Dollar ($)', symbol: '$' },
  { value: 'EUR', label: 'Euro (€)', symbol: '€' },
  { value: 'GBP', label: 'British Pound (£)', symbol: '£' },
];

export const TAX_RATES = [
  { value: 0, label: 'No Tax (0%)' },
  { value: 5, label: 'GST 5%' },
  { value: 12, label: 'GST 12%' },
  { value: 18, label: 'GST 18%' },
  { value: 28, label: 'GST 28%' },
];

export const DEFAULT_TERMS = `1. Payment is due within 30 days of invoice date.
2. All prices are in the quoted currency.
3. This quotation is valid for the period mentioned above.
4. Taxes are applied as per applicable laws.`;

export const DEFAULT_PAYMENT_TERMS = `Bank Transfer / UPI / Cheque
Account details will be provided on confirmation.`;
