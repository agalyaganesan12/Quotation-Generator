# PRP: Quotation Generator

## Purpose

Build a professional web application for creating business quotations with PDF export capability, designed for small businesses and freelancers.

### Core Principles
- Client-side only (no backend required)
- LocalStorage for data persistence
- Professional PDF output

---

## Goal

### What We're Building
A React-based quotation generator that allows users to create, preview, and download professional quotations as PDF documents.

### Why
Small businesses and freelancers need a quick, offline-capable tool to generate professional quotations without subscription costs or complex software.

### User-Visible Behavior
1. Fill in company details (saved for reuse)
2. Enter client information
3. Add line items with quantities and prices
4. Configure discount and tax
5. Preview PDF in modal
6. Download PDF with formatted filename

### Success Criteria
- [x] User can fill all form fields
- [x] Logo uploads and displays in preview/PDF
- [x] GST number validates Indian format
- [x] Items can be added/removed dynamically
- [x] Line totals calculate automatically
- [x] Summary calculations accurate (2 decimal places)
- [x] Signature (typed or image) appears in PDF
- [x] PDF preview works before download
- [x] PDF downloads with correct filename
- [x] Data persists in LocalStorage
- [x] Works on mobile and desktop
- [x] Docker container runs successfully

---

## All Needed Context

### Official Documentation
| Resource | URL | Key Sections |
|----------|-----|--------------|
| React PDF | https://react-pdf.org/ | Document, Page, View, Text |
| React Hook Form | https://react-hook-form.com/ | useForm, useFieldArray |
| Zod | https://zod.dev/ | Schema validation |
| Tailwind CSS v4 | https://tailwindcss.com/ | Vite plugin setup |

### Example Files
| File | Purpose | Patterns to Follow |
|------|---------|-------------------|
| `src/components/pdf/QuotationDocument.tsx` | PDF generation | @react-pdf/renderer patterns |
| `src/services/validationService.ts` | Validation | Zod schemas with custom rules |
| `src/utils/calculations.ts` | Business logic | Pure functions, 2 decimal precision |

### Known Gotchas
1. **Type Imports**: Use `import type` for type-only imports (verbatimModuleSyntax)
2. **Tailwind v4**: Uses `@import "tailwindcss"` not `@tailwind` directives
3. **React-PDF**: Large bundle (~1.8MB) - consider code splitting
4. **LocalStorage**: Check SSR compatibility if migrating to Next.js
5. **PDF Fonts**: Register custom fonts before using in PDF

---

## Project Structure

### Desired State
```
examples/quotation-generator/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/          # Button, Input, Modal, etc.
│   │   ├── form/            # Form section components
│   │   ├── pdf/             # PDF components
│   │   └── preview/         # PDFPreview modal
│   ├── services/            # Storage, validation
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Calculations, formatters
│   ├── constants/           # Currencies, tax rates
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Implementation Blueprint

### Data Models
```typescript
interface CompanyDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstNumber?: string;
  logo?: string; // Base64
}

interface ClientDetails {
  name: string;
  company?: string;
  address: string;
  email?: string;
  phone?: string;
}

interface QuoteItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

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
  signature?: { type: 'typed' | 'image'; value: string };
}
```

### Task Breakdown

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 1 | Initialize Vite + React + TypeScript | package.json, vite.config.ts | Done |
| 2 | Configure Tailwind CSS v4 | globals.css, vite.config.ts | Done |
| 3 | Define TypeScript interfaces | src/types/quote.types.ts | Done |
| 4 | Create calculation utilities | src/utils/calculations.ts | Done |
| 5 | Implement storage service | src/services/storageService.ts | Done |
| 6 | Create validation schemas | src/services/validationService.ts | Done |
| 7 | Build common UI components | src/components/common/*.tsx | Done |
| 8 | Build form components | src/components/form/*.tsx | Done |
| 9 | Build PDF components | src/components/pdf/*.tsx | Done |
| 10 | Integrate PDF preview | src/components/preview/PDFPreview.tsx | Done |
| 11 | Wire up main App | src/App.tsx | Done |
| 12 | Docker configuration | Dockerfile, docker-compose.yml | Done |

### Calculation Logic
```typescript
// Line total
lineTotal = quantity * unitPrice

// Subtotal
subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0)

// Discount
if (discountType === 'percentage') {
  discountAmount = subtotal * (discountValue / 100)
} else {
  discountAmount = Math.min(discountValue, subtotal)
}

// Tax (applied after discount)
afterDiscount = subtotal - discountAmount
taxAmount = afterDiscount * (taxPercent / 100)

// Grand total
grandTotal = afterDiscount + taxAmount
```

---

## Validation Loop

### Level 1: Syntax & Linting
```bash
npm run lint
npx tsc --noEmit
```

### Level 2: Build Test
```bash
npm run build
```

### Level 3: Docker Test
```bash
docker-compose up --build -d
# Open http://localhost:3000
docker logs quotation-generator
```

---

## Final Validation Checklist

- [x] All form fields work correctly
- [x] Calculations match expected values
- [x] PDF generates without errors
- [x] Download works with correct filename
- [x] LocalStorage persists company details
- [x] Mobile responsive design
- [x] Docker container runs successfully

---

## Anti-Patterns (Avoided)

1. No hardcoded API keys (client-side only)
2. No server-side dependencies
3. Clean separation of concerns
4. Type-safe with TypeScript
5. Validated inputs with Zod

---

## Confidence Rating

**10/10** - MVP complete and deployed locally via Docker
