const STORAGE_KEYS = {
  COMPANY: 'quotation_company',
  DRAFT_QUOTE: 'quotation_draft',
  QUOTES: 'quotation_list',
} as const;

export const storageService = {
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

  getCompany<T>(): T | null {
    return this.get<T>(STORAGE_KEYS.COMPANY);
  },

  setCompany<T>(company: T): boolean {
    return this.set(STORAGE_KEYS.COMPANY, company);
  },

  getDraftQuote<T>(): T | null {
    return this.get<T>(STORAGE_KEYS.DRAFT_QUOTE);
  },

  setDraftQuote<T>(quote: T): boolean {
    return this.set(STORAGE_KEYS.DRAFT_QUOTE, quote);
  },

  clearDraftQuote(): void {
    this.remove(STORAGE_KEYS.DRAFT_QUOTE);
  },
};
