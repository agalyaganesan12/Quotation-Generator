# INITIAL.md

## FEATURE:
Quotation Generator - A professional web application for creating business quotations and downloading them as PDF.

## EXAMPLES:
The `examples/` folder contains:

### quotation-generator/
A complete React + TypeScript application for generating professional quotations:
- **Company Details**: Name, address, phone, email, GST number, logo upload
- **Client Details**: Client name, company, address, contact info
- **Items Table**: Dynamic add/remove items with auto-calculations
- **Pricing**: Discount (percentage or fixed), GST tax rates (5%, 12%, 18%, 28%)
- **Signature**: Typed name or uploaded image
- **PDF Export**: A4 professional layout with download

**Quick Start:**
```bash
cd examples/quotation-generator
npm install
npm run dev
# Open http://localhost:5173
```

**Docker:**
```bash
cd examples/quotation-generator
docker-compose up --build -d
# Open http://localhost:3000
```

## DOCUMENTATION:
- `CLAUDE.md` - AI assistant guidelines and coding conventions
- `PLANNING.md` - Project architecture and design decisions
- `TASK.md` - Task tracking and progress
- `examples/quotation-generator/README.md` - App-specific documentation
- `examples/quotation-generator/commands.md` - CLI commands reference

## OTHER CONSIDERATIONS:

### Common AI Gotchas
1. **Type Imports**: Use `import type` for type-only imports in TypeScript with `verbatimModuleSyntax`
2. **Tailwind v4**: Uses `@import "tailwindcss"` instead of `@tailwind` directives
3. **React-PDF**: Large bundle size (~1.8MB) - consider code splitting for production
4. **LocalStorage**: Check for SSR compatibility if moving to Next.js

### Development Notes
- Company details auto-save to LocalStorage
- PDF filename format: `Quotation_<ClientName>_<QuoteNumber>.pdf`
- GST validation: 15-character Indian format (e.g., `22AAAAA0000A1Z5`)
- Calculations: All amounts rounded to 2 decimal places

### Prerequisites
- Node.js 18+
- npm 9+
- Docker (optional)
