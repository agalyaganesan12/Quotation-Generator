/**
 * Storage service for managing localStorage data
 */

import type { QuoteFormData } from '../types/quote.types';

// Storage keys
const STORAGE_KEYS = {
  COMPANY: 'quotation_company',
  DRAFT_QUOTE: 'quotation_draft',
  QUOTES: 'quotation_list',
  INVOICES: 'invoice_list',
} as const;

// Stored quotation type (with additional metadata)
export interface StoredQuotation extends QuoteFormData {
  id: string;
  grandTotal: number;
  createdAt: string;
  updatedAt: string;
  convertedToInvoice?: boolean;
}

// Stored invoice type
export interface StoredInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  sourceQuoteId?: string;
  currency: string;
  company: QuoteFormData['company'];
  client: QuoteFormData['client'];
  items: QuoteFormData['items'];
  discountType: string;
  discountValue: number;
  taxPercent: number;
  grandTotal: number;
  terms?: string;
  paymentTerms?: string;
  signature?: QuoteFormData['signature'];
  createdAt: string;
  updatedAt: string;
}

export const storageService = {
  // Generic methods
  get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      console.error(`Error reading from localStorage: ${key}`);
      return null;
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.error(`Error writing to localStorage: ${key}`);
      return false;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error(`Error removing from localStorage: ${key}`);
    }
  },

  // Company methods
  getCompany<T>(): T | null {
    return this.get<T>(STORAGE_KEYS.COMPANY);
  },

  setCompany<T>(company: T): boolean {
    return this.set(STORAGE_KEYS.COMPANY, company);
  },

  // Draft quote methods
  getDraftQuote<T>(): T | null {
    return this.get<T>(STORAGE_KEYS.DRAFT_QUOTE);
  },

  setDraftQuote<T>(quote: T): boolean {
    return this.set(STORAGE_KEYS.DRAFT_QUOTE, quote);
  },

  clearDraftQuote(): void {
    this.remove(STORAGE_KEYS.DRAFT_QUOTE);
  },

  // Quotation CRUD methods
  getQuotations(): StoredQuotation[] {
    return this.get<StoredQuotation[]>(STORAGE_KEYS.QUOTES) || [];
  },

  saveQuotation(quotation: StoredQuotation): boolean {
    const quotations = this.getQuotations();
    const existingIndex = quotations.findIndex((q) => q.id === quotation.id);

    if (existingIndex >= 0) {
      quotations[existingIndex] = { ...quotation, updatedAt: new Date().toISOString() };
    } else {
      quotations.push({
        ...quotation,
        createdAt: quotation.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return this.set(STORAGE_KEYS.QUOTES, quotations);
  },

  deleteQuotation(id: string): boolean {
    const quotations = this.getQuotations().filter((q) => q.id !== id);
    return this.set(STORAGE_KEYS.QUOTES, quotations);
  },

  getQuotationById(id: string): StoredQuotation | null {
    const quotations = this.getQuotations();
    return quotations.find((q) => q.id === id) || null;
  },

  markQuotationConverted(id: string): boolean {
    const quotations = this.getQuotations();
    const index = quotations.findIndex((q) => q.id === id);
    if (index >= 0) {
      quotations[index].convertedToInvoice = true;
      quotations[index].updatedAt = new Date().toISOString();
      return this.set(STORAGE_KEYS.QUOTES, quotations);
    }
    return false;
  },

  // Invoice CRUD methods
  getInvoices(): StoredInvoice[] {
    return this.get<StoredInvoice[]>(STORAGE_KEYS.INVOICES) || [];
  },

  saveInvoice(invoice: StoredInvoice): boolean {
    const invoices = this.getInvoices();
    const existingIndex = invoices.findIndex((inv) => inv.id === invoice.id);

    if (existingIndex >= 0) {
      invoices[existingIndex] = { ...invoice, updatedAt: new Date().toISOString() };
    } else {
      invoices.push({
        ...invoice,
        createdAt: invoice.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return this.set(STORAGE_KEYS.INVOICES, invoices);
  },

  deleteInvoice(id: string): boolean {
    const invoices = this.getInvoices().filter((inv) => inv.id !== id);
    return this.set(STORAGE_KEYS.INVOICES, invoices);
  },

  getInvoiceById(id: string): StoredInvoice | null {
    const invoices = this.getInvoices();
    return invoices.find((inv) => inv.id === id) || null;
  },

  updateInvoiceStatus(id: string, status: StoredInvoice['status']): boolean {
    const invoices = this.getInvoices();
    const index = invoices.findIndex((inv) => inv.id === id);
    if (index >= 0) {
      invoices[index].status = status;
      invoices[index].updatedAt = new Date().toISOString();
      return this.set(STORAGE_KEYS.INVOICES, invoices);
    }
    return false;
  },
};
