/**
 * Invoice PDF Document component
 */

import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { styles } from './pdfStyles';
import { PDFClientSection } from './PDFClientSection';
import { PDFItemsTable } from './PDFItemsTable';
import { PDFSummary } from './PDFSummary';
import { PDFFooter } from './PDFFooter';
import { formatDate } from '../../utils/formatters';
import { calculateAllTotals } from '../../utils/calculations';
import type { InvoiceFormData } from '../../types/invoice.types';

interface InvoiceDocumentProps {
  data: InvoiceFormData;
}

export function InvoiceDocument({ data }: InvoiceDocumentProps) {
  const { company, client, items, currency, discountType, discountValue, taxPercent } = data;

  const totals = calculateAllTotals(items, discountType, discountValue, taxPercent);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {company.logo && (
              <Image src={company.logo} style={styles.logo} />
            )}
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companyDetails}>{company.address}</Text>
            <Text style={styles.companyDetails}>{company.phone}</Text>
            <Text style={styles.companyDetails}>{company.email}</Text>
            {company.gstNumber && (
              <Text style={styles.gstNumber}>GSTIN: {company.gstNumber}</Text>
            )}
          </View>
          <View style={styles.headerRight}>
            <View style={styles.quoteInfoBox}>
              <Text style={[styles.quoteTitle, { color: '#8b4513' }]}>INVOICE</Text>
              <View style={styles.quoteInfoRow}>
                <Text style={styles.quoteInfoLabel}>Invoice No:</Text>
                <Text style={styles.quoteInfoValue}>{data.invoiceNumber}</Text>
              </View>
              <View style={styles.quoteInfoRow}>
                <Text style={styles.quoteInfoLabel}>Date:</Text>
                <Text style={styles.quoteInfoValue}>{formatDate(data.date)}</Text>
              </View>
              <View style={styles.quoteInfoRow}>
                <Text style={styles.quoteInfoLabel}>Due Date:</Text>
                <Text style={styles.quoteInfoValue}>{formatDate(data.dueDate)}</Text>
              </View>
              <View style={styles.quoteInfoRow}>
                <Text style={styles.quoteInfoLabel}>Status:</Text>
                <Text style={[styles.quoteInfoValue, { textTransform: 'capitalize' }]}>
                  {data.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Client Section */}
        <PDFClientSection client={client} />

        {/* Items Table */}
        <PDFItemsTable items={items} currency={currency} />

        {/* Summary */}
        <PDFSummary
          subtotal={totals.subtotal}
          discountType={discountType}
          discountValue={discountValue}
          discountAmount={totals.discountAmount}
          taxPercent={taxPercent}
          taxAmount={totals.taxAmount}
          grandTotal={totals.grandTotal}
          currency={currency}
        />

        {/* Footer */}
        <PDFFooter
          terms={data.terms}
          paymentTerms={data.paymentTerms}
          signature={data.signature}
          companyName={company.name}
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
