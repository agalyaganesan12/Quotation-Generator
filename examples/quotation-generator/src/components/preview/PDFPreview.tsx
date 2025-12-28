import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Modal, Button } from '../common';
import { QuotationDocument } from '../pdf';
import { generatePDFFilename } from '../../utils/formatters';
import type { QuoteFormData } from '../../types/quote.types';

interface PDFPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuoteFormData;
}

export function PDFPreview({ isOpen, onClose, data }: PDFPreviewProps) {
  const filename = generatePDFFilename(data.client.name, data.quoteNumber);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Preview Quotation" size="full">
      <div className="flex flex-col h-full">
        {/* PDF Viewer */}
        <div className="flex-1 min-h-[500px]">
          <PDFViewer width="100%" height="100%" showToolbar={false}>
            <QuotationDocument data={data} />
          </PDFViewer>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <PDFDownloadLink
            document={<QuotationDocument data={data} />}
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
