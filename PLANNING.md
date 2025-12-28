# PLANNING.md - Project Architecture

## Quotation Generator

### Overview

A client-side web application for creating professional quotations with PDF export capability. Built with React, TypeScript, and @react-pdf/renderer.

---

## Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   React     │  │   Tailwind  │  │   @react-pdf/       │  │
│  │   Forms     │  │   CSS       │  │   renderer          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   react-    │  │   Zod       │  │   LocalStorage      │  │
│  │   hook-form │  │   Validation│  │   Persistence       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Input → Form State → Validation → Preview → PDF Generation → Download
                ↓
         LocalStorage (company details auto-save)
```

---

## Component Architecture

### Component Hierarchy

```
App
├── Header
├── QuotationForm
│   ├── CompanyDetailsForm
│   │   └── FileUpload (logo)
│   ├── ClientDetailsForm
│   ├── QuoteMetadataForm
│   ├── ItemsTable
│   │   └── ItemRow (dynamic)
│   ├── SummarySection
│   ├── TermsAndNotes
│   └── SignatureSection
│       └── FileUpload (signature)
├── PDFPreview (Modal)
│   └── QuotationDocument
│       ├── PDFHeader
│       ├── PDFClientSection
│       ├── PDFItemsTable
│       ├── PDFSummary
│       └── PDFFooter
└── Footer
```

### State Management

- **Form State:** react-hook-form with Zod resolver
- **Persistence:** LocalStorage for company details
- **PDF Data:** Passed as props to QuotationDocument

---

## Key Design Decisions

### 1. Client-Side PDF Generation

**Decision:** Use @react-pdf/renderer instead of server-side

**Rationale:**
- No backend required
- Faster iteration
- Simpler deployment (static hosting)
- PDF generated instantly in browser

**Trade-offs:**
- Larger bundle size (~1.8MB)
- Limited to React PDF components

### 2. LocalStorage for Persistence

**Decision:** Store company details in LocalStorage

**Rationale:**
- No authentication needed
- Instant data recovery on refresh
- Privacy (data stays on user's device)

**Trade-offs:**
- Data lost if browser storage cleared
- No cross-device sync

### 3. Tailwind CSS v4

**Decision:** Use Tailwind v4 with Vite plugin

**Rationale:**
- Modern CSS features
- Faster build times
- No PostCSS config needed

---

## Type System

### Core Types

```typescript
// Company information
interface CompanyDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
  logo?: string; // Base64
}

// Client information
interface ClientDetails {
  name: string;
  company?: string;
  address: string;
  email?: string;
  phone?: string;
}

// Line item in quotation
interface QuoteItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

// Complete quotation
interface Quote {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  company: CompanyDetails;
  client: ClientDetails;
  items: QuoteItem[];
  subtotal: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  taxPercent: number;
  taxAmount: number;
  grandTotal: number;
  terms?: string;
  paymentTerms?: string;
  signature?: Signature;
}
```

---

## Calculation Logic

```typescript
// Line total = quantity * unit price
lineTotal = quantity * unitPrice

// Subtotal = sum of all line totals
subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)

// Discount amount
if (discountType === 'percentage') {
  discountAmount = subtotal * (discountValue / 100)
} else {
  discountAmount = min(discountValue, subtotal)
}

// Tax amount (applied after discount)
afterDiscount = subtotal - discountAmount
taxAmount = afterDiscount * (taxPercent / 100)

// Grand total
grandTotal = afterDiscount + taxAmount
```

---

## File Structure Rationale

| Directory | Purpose | Example |
|-----------|---------|---------|
| `components/common/` | Reusable UI primitives | Button, Input, Modal |
| `components/form/` | Form section components | CompanyDetailsForm |
| `components/pdf/` | PDF-specific components | PDFHeader, PDFItemsTable |
| `services/` | Business logic | storageService, validationService |
| `utils/` | Pure utility functions | calculations, formatters |
| `types/` | TypeScript definitions | quote.types.ts |
| `constants/` | Static configuration | currencies, taxRates |

---

## Future Considerations

### Scalability
- Quote history would require IndexedDB or backend
- Multiple templates need component abstraction
- Email functionality requires backend service

### Performance
- Code-split PDF components (lazy load)
- Memoize calculation functions
- Virtualize long item lists

### Security
- Validate all inputs (Zod schemas in place)
- Sanitize PDF filename output
- No sensitive data in localStorage keys
