# Quotation Generator

A professional web application for creating quotations and downloading them as PDF.

## Features

- **Company Details**: Name, address, phone, email, GST number, and logo upload
- **Client Details**: Client name, company, address, and contact information
- **Quote Metadata**: Auto-generated quote number, date, validity period, and currency selection
- **Dynamic Items Table**: Add/remove items with automatic line total calculations
- **Summary Section**: Subtotal, discount (percentage or fixed), tax (GST), and grand total
- **Terms & Conditions**: Customizable terms and payment terms
- **Digital Signature**: Type name or upload signature image
- **PDF Preview**: View the quotation before downloading
- **PDF Download**: Download as A4 professional PDF
- **Data Persistence**: Company details saved to LocalStorage

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **PDF Generation**: @react-pdf/renderer
- **Forms**: react-hook-form + zod validation
- **Data Persistence**: LocalStorage

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd examples/quotation-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deploy to Hostinger

1. Run `npm run build`
2. Upload contents of `dist/` folder to Hostinger's `public_html` directory
3. The app is now live!

## Usage

1. **Fill Company Details**: Enter your company information and optionally upload a logo
2. **Enter Client Details**: Fill in the client's name, address, and contact info
3. **Add Items**: Add line items with name, description, quantity, and unit price
4. **Configure Pricing**: Set discount and tax rates
5. **Add Terms**: Customize terms & conditions and payment terms
6. **Add Signature**: Type your name or upload a signature image
7. **Preview & Download**: Click "Preview & Download PDF" to see the quotation and download it

## PDF Filename Format

Downloads are named: `Quotation_<ClientName>_<QuoteNumber>.pdf`

Example: `Quotation_John_Doe_QT-202512-0001.pdf`

## GST Number Format

Indian GST numbers must follow this format:
- 15 characters
- Example: `22AAAAA0000A1Z5`

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI components (Button, Input, etc.)
│   ├── form/         # Form section components
│   ├── pdf/          # PDF generation components
│   └── preview/      # PDF preview modal
├── constants/        # Currency and tax rate constants
├── services/         # Storage and validation services
├── types/            # TypeScript type definitions
└── utils/            # Utility functions (calculations, formatters)
```

## License

MIT
