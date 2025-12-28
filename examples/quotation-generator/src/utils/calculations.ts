import type { QuoteItem, DiscountType } from '../types/quote.types';

export function calculateLineTotal(quantity: number, unitPrice: number): number {
  return Math.round(quantity * unitPrice * 100) / 100;
}

export function calculateSubtotal(items: QuoteItem[]): number {
  return Math.round(
    items.reduce((sum, item) => sum + item.lineTotal, 0) * 100
  ) / 100;
}

export function calculateDiscount(
  subtotal: number,
  discountType: DiscountType,
  discountValue: number
): number {
  if (discountValue <= 0) return 0;

  if (discountType === 'percentage') {
    const discount = subtotal * (discountValue / 100);
    return Math.round(Math.min(discount, subtotal) * 100) / 100;
  }

  return Math.round(Math.min(discountValue, subtotal) * 100) / 100;
}

export function calculateTax(amount: number, taxPercent: number): number {
  if (taxPercent <= 0) return 0;
  return Math.round(amount * (taxPercent / 100) * 100) / 100;
}

export function calculateGrandTotal(
  subtotal: number,
  discountAmount: number,
  taxAmount: number
): number {
  const afterDiscount = subtotal - discountAmount;
  return Math.round((afterDiscount + taxAmount) * 100) / 100;
}

export function calculateAllTotals(
  items: QuoteItem[],
  discountType: DiscountType,
  discountValue: number,
  taxPercent: number
): {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
} {
  const subtotal = calculateSubtotal(items);
  const discountAmount = calculateDiscount(subtotal, discountType, discountValue);
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = calculateTax(afterDiscount, taxPercent);
  const grandTotal = calculateGrandTotal(subtotal, discountAmount, taxAmount);

  return {
    subtotal,
    discountAmount,
    taxAmount,
    grandTotal,
  };
}
