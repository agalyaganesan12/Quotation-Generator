import type { Currency } from '../types/quote.types';
import { CURRENCY_SYMBOLS } from '../types/quote.types';

export function formatCurrency(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const formatted = amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function generateQuoteNumber(prefix: string = 'QT'): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${year}${month}-${random}`;
}

export function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
}

export function generatePDFFilename(clientName: string, quoteNumber: string): string {
  const sanitizedClient = sanitizeFilename(clientName);
  const sanitizedQuote = sanitizeFilename(quoteNumber);
  return `Quotation_${sanitizedClient}_${sanitizedQuote}.pdf`;
}
