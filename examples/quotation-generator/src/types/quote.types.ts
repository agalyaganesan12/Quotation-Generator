export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';
export type DiscountType = 'percentage' | 'fixed';
export type SignatureType = 'typed' | 'image';

export interface CompanyDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
  logo?: string; // Base64 encoded image
}

export interface ClientDetails {
  name: string;
  company?: string;
  address: string;
  email?: string;
  phone?: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Signature {
  type: SignatureType;
  value: string; // Typed name or base64 image
}

export interface Quote {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  currency: Currency;
  company: CompanyDetails;
  client: ClientDetails;
  items: QuoteItem[];
  subtotal: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  taxPercent: number;
  taxAmount: number;
  grandTotal: number;
  terms?: string;
  paymentTerms?: string;
  signature?: Signature;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteFormData {
  company: CompanyDetails;
  client: ClientDetails;
  quoteNumber: string;
  date: string;
  validUntil: string;
  currency: Currency;
  items: QuoteItem[];
  discountType: DiscountType;
  discountValue: number;
  taxPercent: number;
  terms?: string;
  paymentTerms?: string;
  signature?: Signature;
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const DEFAULT_COMPANY: CompanyDetails = {
  name: '',
  address: '',
  phone: '',
  email: '',
  gstNumber: '',
};

export const DEFAULT_CLIENT: ClientDetails = {
  name: '',
  company: '',
  address: '',
  email: '',
  phone: '',
};

export const DEFAULT_ITEM: Omit<QuoteItem, 'id'> = {
  name: '',
  description: '',
  quantity: 1,
  unitPrice: 0,
  lineTotal: 0,
};
