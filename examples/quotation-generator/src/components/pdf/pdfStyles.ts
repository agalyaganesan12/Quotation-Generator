import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    backgroundColor: '#ffffff',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#8b4513',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 100,
    height: 50,
    objectFit: 'contain',
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  gstNumber: {
    fontSize: 9,
    color: '#8b4513',
    fontWeight: 'bold',
    marginTop: 5,
  },

  // Quote Info Box
  quoteInfoBox: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  quoteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  quoteInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  quoteInfoLabel: {
    width: 80,
    fontSize: 9,
    color: '#6b7280',
  },
  quoteInfoValue: {
    fontSize: 10,
    color: '#1f2937',
    fontWeight: 'bold',
  },

  // Client Section
  clientSection: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#fafafa',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clientName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 3,
  },
  clientDetails: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },

  // Items Table
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#8b4513',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableHeaderCell: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableRowAlt: {
    backgroundColor: '#f9fafb',
  },
  tableCell: {
    fontSize: 9,
    color: '#374151',
  },
  tableCellBold: {
    fontSize: 9,
    color: '#1f2937',
    fontWeight: 'bold',
  },

  // Column widths
  colNum: { width: '5%' },
  colName: { width: '30%' },
  colDesc: { width: '25%' },
  colQty: { width: '10%', textAlign: 'right' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },

  // Summary
  summarySection: {
    marginTop: 10,
    marginLeft: 'auto',
    width: 250,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 10,
    color: '#1f2937',
  },
  summaryDiscount: {
    color: '#dc2626',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: '#8b4513',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  grandTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  // Terms
  termsSection: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  termsTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  termsText: {
    fontSize: 8,
    color: '#6b7280',
    lineHeight: 1.6,
  },

  // Footer / Signature
  footer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureSection: {
    width: 200,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    marginTop: 50,
    paddingTop: 5,
  },
  signatureLabel: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'center',
  },
  signatureImage: {
    width: 150,
    height: 50,
    objectFit: 'contain',
  },
  signatureTyped: {
    fontSize: 18,
    fontFamily: 'Times-Italic',
    color: '#1f2937',
    marginBottom: 5,
  },

  // Page Number
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 8,
    color: '#9ca3af',
  },
});
