import { View, Text } from '@react-pdf/renderer';
import { styles } from './pdfStyles';
import { formatCurrency } from '../../utils/formatters';
import type { QuoteItem, Currency } from '../../types/quote.types';

interface PDFItemsTableProps {
  items: QuoteItem[];
  currency: Currency;
}

export function PDFItemsTable({ items, currency }: PDFItemsTableProps) {
  return (
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, styles.colNum]}>#</Text>
        <Text style={[styles.tableHeaderCell, styles.colName]}>Item</Text>
        <Text style={[styles.tableHeaderCell, styles.colDesc]}>Description</Text>
        <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
        <Text style={[styles.tableHeaderCell, styles.colPrice]}>Unit Price</Text>
        <Text style={[styles.tableHeaderCell, styles.colTotal]}>Total</Text>
      </View>

      {/* Table Rows */}
      {items.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.tableRow,
            index % 2 === 1 ? styles.tableRowAlt : {},
          ]}
        >
          <Text style={[styles.tableCell, styles.colNum]}>{index + 1}</Text>
          <Text style={[styles.tableCellBold, styles.colName]}>{item.name}</Text>
          <Text style={[styles.tableCell, styles.colDesc]}>
            {item.description || '-'}
          </Text>
          <Text style={[styles.tableCell, styles.colQty]}>{item.quantity}</Text>
          <Text style={[styles.tableCell, styles.colPrice]}>
            {formatCurrency(item.unitPrice, currency)}
          </Text>
          <Text style={[styles.tableCellBold, styles.colTotal]}>
            {formatCurrency(item.lineTotal, currency)}
          </Text>
        </View>
      ))}
    </View>
  );
}
