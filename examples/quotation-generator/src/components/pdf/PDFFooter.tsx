import { View, Text, Image } from '@react-pdf/renderer';
import { styles } from './pdfStyles';
import type { Signature } from '../../types/quote.types';

interface PDFFooterProps {
  terms?: string;
  paymentTerms?: string;
  signature?: Signature;
  companyName: string;
}

export function PDFFooter({ terms, paymentTerms, signature, companyName }: PDFFooterProps) {
  return (
    <>
      {/* Terms Section - Two Column Layout */}
      {(terms || paymentTerms) && (
        <View style={styles.termsSection}>
          <View style={styles.termsRow}>
            {terms && (
              <View style={styles.termsColumn}>
                <Text style={styles.termsTitle}>Terms & Conditions</Text>
                <Text style={styles.termsText}>{terms}</Text>
              </View>
            )}
            {paymentTerms && (
              <View style={styles.termsColumn}>
                <Text style={styles.termsTitle}>Payment Terms</Text>
                <Text style={styles.termsText}>{paymentTerms}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Signature Section - Right Aligned */}
      <View style={styles.footer}>
        <View style={styles.signatureSection}>
          {signature?.type === 'image' && signature.value && (
            <Image src={signature.value} style={styles.signatureImage} />
          )}
          {signature?.type === 'typed' && signature.value && (
            <Text style={styles.signatureTyped}>{signature.value}</Text>
          )}
          <View style={styles.signatureLine}>
            <Text style={styles.signatureLabel}>Authorized Signatory</Text>
            <Text style={styles.signatureLabel}>{companyName}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
