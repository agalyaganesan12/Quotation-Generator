import { View, Text, Image } from '@react-pdf/renderer';
import { styles } from './pdfStyles';
import { formatDate } from '../../utils/formatters';
import type { CompanyDetails } from '../../types/quote.types';

interface PDFHeaderProps {
  company: CompanyDetails;
  quoteNumber: string;
  date: string;
  validUntil: string;
}

export function PDFHeader({ company, quoteNumber, date, validUntil }: PDFHeaderProps) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {company.logo && (
            <Image src={company.logo} style={styles.logo} />
          )}
          <Text style={styles.companyName}>{company.name}</Text>
          <Text style={styles.companyDetails}>{company.address}</Text>
          <Text style={styles.companyDetails}>Phone: {company.phone}</Text>
          <Text style={styles.companyDetails}>Email: {company.email}</Text>
          {company.gstNumber && (
            <Text style={styles.gstNumber}>GSTIN: {company.gstNumber}</Text>
          )}
        </View>
        <View style={styles.headerRight}>
          <View style={styles.quoteInfoBox}>
            <Text style={styles.quoteTitle}>QUOTATION</Text>
            <View style={styles.quoteInfoRow}>
              <Text style={styles.quoteInfoLabel}>Quote No:</Text>
              <Text style={styles.quoteInfoValue}>{quoteNumber}</Text>
            </View>
            <View style={styles.quoteInfoRow}>
              <Text style={styles.quoteInfoLabel}>Date:</Text>
              <Text style={styles.quoteInfoValue}>{formatDate(date)}</Text>
            </View>
            <View style={styles.quoteInfoRow}>
              <Text style={styles.quoteInfoLabel}>Valid Until:</Text>
              <Text style={styles.quoteInfoValue}>{formatDate(validUntil)}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
