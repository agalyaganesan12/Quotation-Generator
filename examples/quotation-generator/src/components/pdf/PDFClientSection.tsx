import { View, Text } from '@react-pdf/renderer';
import { styles } from './pdfStyles';
import type { ClientDetails } from '../../types/quote.types';

interface PDFClientSectionProps {
  client: ClientDetails;
}

export function PDFClientSection({ client }: PDFClientSectionProps) {
  return (
    <View style={styles.clientSection}>
      <Text style={styles.sectionTitle}>Bill To</Text>
      <Text style={styles.clientName}>{client.name}</Text>
      {client.company && (
        <Text style={styles.clientCompany}>{client.company}</Text>
      )}
      <Text style={styles.clientDetails}>{client.address}</Text>
      {client.phone && (
        <Text style={styles.clientDetails}>Phone: {client.phone}</Text>
      )}
      {client.email && (
        <Text style={styles.clientDetails}>Email: {client.email}</Text>
      )}
    </View>
  );
}
