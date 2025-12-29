import { StyleSheet } from '@react-pdf/renderer';

/**
 * Professional PDF styles for A4 invoice/quotation documents
 * Optimized for print and B&W compatibility
 */
export const styles = StyleSheet.create({
  // Page setup - A4 with proper margins
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
  },

  // ===== HEADER SECTION =====
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerLeft: {
    flex: 1,
    maxWidth: 280,
  },
  headerRight: {
    width: 180,
  },
  logo: {
    width: 80,
    height: 40,
    objectFit: 'contain',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  companyDetails: {
    fontSize: 9,
    color: '#4a4a4a',
    marginBottom: 2,
    lineHeight: 1.3,
  },
  gstNumber: {
    fontSize: 9,
    color: '#1a1a1a',
    fontWeight: 'bold',
    marginTop: 4,
  },

  // ===== INVOICE/QUOTE INFO BOX =====
  quoteInfoBox: {
    borderWidth: 1,
    borderColor: '#1a1a1a',
    padding: 12,
  },
  quoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b4513',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quoteInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingVertical: 2,
  },
  quoteInfoLabel: {
    fontSize: 9,
    color: '#4a4a4a',
    width: 70,
  },
  quoteInfoValue: {
    fontSize: 9,
    color: '#1a1a1a',
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },

  // ===== CLIENT/BILL TO SECTION =====
  clientSection: {
    marginBottom: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clientName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  clientCompany: {
    fontSize: 10,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  clientDetails: {
    fontSize: 9,
    color: '#4a4a4a',
    marginBottom: 2,
    lineHeight: 1.3,
  },

  // ===== ITEMS TABLE =====
  table: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  tableHeaderCell: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableRowAlt: {
    backgroundColor: '#f5f5f5',
  },
  tableCell: {
    fontSize: 9,
    color: '#1a1a1a',
  },
  tableCellBold: {
    fontSize: 9,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },

  // Column widths - total = 100%
  colNum: { width: '6%', textAlign: 'center' },
  colName: { width: '28%', textAlign: 'left' },
  colDesc: { width: '26%', textAlign: 'left' },
  colQty: { width: '10%', textAlign: 'right' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },

  // ===== SUMMARY SECTION =====
  summarySection: {
    marginTop: 12,
    marginLeft: 'auto',
    width: 220,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#4a4a4a',
  },
  summaryValue: {
    fontSize: 10,
    color: '#1a1a1a',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  summaryDiscount: {
    color: '#c41e3a',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1a1a1a',
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  grandTotalValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  // ===== TERMS & FOOTER =====
  termsSection: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  termsRow: {
    flexDirection: 'row',
    gap: 20,
  },
  termsColumn: {
    flex: 1,
  },
  termsTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  termsText: {
    fontSize: 8,
    color: '#4a4a4a',
    lineHeight: 1.5,
  },

  // ===== SIGNATURE =====
  footer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signatureSection: {
    width: 180,
    alignItems: 'center',
  },
  signatureImage: {
    width: 120,
    height: 40,
    objectFit: 'contain',
    marginBottom: 4,
  },
  signatureTyped: {
    fontSize: 16,
    fontFamily: 'Times-Italic',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  signatureLine: {
    width: 150,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    paddingTop: 4,
  },
  signatureLabel: {
    fontSize: 8,
    color: '#4a4a4a',
    textAlign: 'center',
  },

  // ===== PAGE NUMBER =====
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 40,
    fontSize: 8,
    color: '#4a4a4a',
  },
});
