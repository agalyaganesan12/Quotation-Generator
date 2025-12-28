import { useState } from 'react';
import type { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Input, FileUpload, Button } from '../common';
import type { QuoteFormData, SignatureType } from '../../types/quote.types';

interface SignatureSectionProps {
  watch: UseFormWatch<QuoteFormData>;
  setValue: UseFormSetValue<QuoteFormData>;
}

export function SignatureSection({ watch, setValue }: SignatureSectionProps) {
  const signature = watch('signature');
  const [signatureType, setSignatureType] = useState<SignatureType>(
    signature?.type || 'typed'
  );

  const handleTypeChange = (type: SignatureType) => {
    setSignatureType(type);
    setValue('signature', { type, value: '' });
  };

  const handleTypedSignature = (value: string) => {
    setValue('signature', { type: 'typed', value });
  };

  const handleImageUpload = (base64: string) => {
    setValue('signature', { type: 'image', value: base64 });
  };

  const handleRemoveSignature = () => {
    setValue('signature', undefined);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Authorized Signature
      </h2>

      {/* Signature Type Toggle */}
      <div className="flex gap-2 mb-4">
        <Button
          type="button"
          variant={signatureType === 'typed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => handleTypeChange('typed')}
        >
          Type Name
        </Button>
        <Button
          type="button"
          variant={signatureType === 'image' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => handleTypeChange('image')}
        >
          Upload Image
        </Button>
      </div>

      {/* Signature Input */}
      {signatureType === 'typed' ? (
        <div className="max-w-md">
          <Input
            label="Signatory Name"
            placeholder="Enter name of authorized signatory"
            value={signature?.type === 'typed' ? signature.value : ''}
            onChange={(e) => handleTypedSignature(e.target.value)}
          />
          {signature?.type === 'typed' && signature.value && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <p
                className="text-2xl italic"
                style={{ fontFamily: 'cursive, serif' }}
              >
                {signature.value}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-md">
          <FileUpload
            label="Signature Image"
            accept="image/png, image/jpeg"
            maxSizeMB={1}
            preview={signature?.type === 'image' ? signature.value : undefined}
            onUpload={handleImageUpload}
            onRemove={handleRemoveSignature}
          />
          <p className="text-sm text-gray-500 mt-2">
            Upload a signature image (PNG or JPG, max 1MB)
          </p>
        </div>
      )}
    </div>
  );
}
