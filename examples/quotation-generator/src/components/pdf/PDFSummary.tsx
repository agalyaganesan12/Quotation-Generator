import { View, Text } from '@react-pdf/renderer';
import { styles } from './pdfStyles';
import { formatCurrency } from '../../utils/formatters';
import type { Currency, DiscountType } from '../../types/quote.types';

interface PDFSummaryProps {
  subtotal: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  taxPercent: number;
  taxAmount: number;
  grandTotal: number;
  currency: Currency;
}

export function PDFSummary({
  subtotal,
  discountType,
  discountValue,
  discountAmount,
  taxPercent,
  taxAmount,
  grandTotal,
  currency,
}: PDFSummaryProps) {
  const showDiscount = discountAmount > 0;
  const showTax = taxAmount > 0;

  return (
    <View style={styles.summarySection}>
      {/* Subtotal */}
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>{formatCurrency(subtotal, currency)}</Text>
      </View>

      {/* Discount */}
      {showDiscount && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Discount {discountType === 'percentage' ? `(${discountValue}%)` : ''}
          </Text>
          <Text style={[styles.summaryValue, styles.summaryDiscount]}>
            - {formatCurrency(discountAmount, currency)}
          </Text>
        </View>
      )}

      {/* Tax */}
      {showTax && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax ({taxPercent}%)</Text>
          <Text style={styles.summaryValue}>
            + {formatCurrency(taxAmount, currency)}
          </Text>
        </View>
      )}

      {/* Grand Total */}
      <View style={styles.grandTotalRow}>
        <Text style={styles.grandTotalLabel}>Grand Total</Text>
        <Text style={styles.grandTotalValue}>
          {formatCurrency(grandTotal, currency)}
        </Text>
      </View>
    </View>
  );
}
