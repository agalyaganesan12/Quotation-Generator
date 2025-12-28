/**
 * Invoice PDF Preview modal component
 */

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Modal, Button } from '../common';
import { InvoiceDocument } from '../pdf/InvoiceDocument';
import { generateInvoicePDFFilename } from '../../utils/formatters';
import type { InvoiceFormData } from '../../types/invoice.types';

interface InvoicePDFPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvoiceFormData;
}

export function InvoicePDFPreview({ isOpen, onClose, data }: InvoicePDFPreviewProps) {
  const filename = generateInvoicePDFFilename(
    data.client.name || data.client.company || 'Client',
    data.invoiceNumber
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invoice Preview" size="xl">
      <div className="flex flex-col h-[70vh]">
        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
          <PDFViewer width="100%" height="100%" showToolbar={false}>
            <InvoiceDocument data={data} />
          </PDFViewer>
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <PDFDownloadLink
            document={<InvoiceDocument data={data} />}
            fileName={filename}
          >
            {({ loading }) => (
              <Button variant="primary" disabled={loading}>
                {loading ? 'Generating...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </Modal>
  );
}
