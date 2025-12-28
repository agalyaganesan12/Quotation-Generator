import { Document, Page, Text } from '@react-pdf/renderer';
import { styles } from './pdfStyles';
import { PDFHeader } from './PDFHeader';
import { PDFClientSection } from './PDFClientSection';
import { PDFItemsTable } from './PDFItemsTable';
import { PDFSummary } from './PDFSummary';
import { PDFFooter } from './PDFFooter';
import { calculateAllTotals } from '../../utils/calculations';
import type { QuoteFormData } from '../../types/quote.types';

interface QuotationDocumentProps {
  data: QuoteFormData;
}

export function QuotationDocument({ data }: QuotationDocumentProps) {
  const totals = calculateAllTotals(
    data.items,
    data.discountType,
    data.discountValue,
    data.taxPercent
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Company Info and Quote Details */}
        <PDFHeader
          company={data.company}
          quoteNumber={data.quoteNumber}
          date={data.date}
          validUntil={data.validUntil}
        />

        {/* Client Section */}
        <PDFClientSection client={data.client} />

        {/* Items Table */}
        <PDFItemsTable items={data.items} currency={data.currency} />

        {/* Summary */}
        <PDFSummary
          subtotal={totals.subtotal}
          discountType={data.discountType}
          discountValue={data.discountValue}
          discountAmount={totals.discountAmount}
          taxPercent={data.taxPercent}
          taxAmount={totals.taxAmount}
          grandTotal={totals.grandTotal}
          currency={data.currency}
        />

        {/* Footer with Terms and Signature */}
        <PDFFooter
          terms={data.terms}
          paymentTerms={data.paymentTerms}
          signature={data.signature}
          companyName={data.company.name}
        />

        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
