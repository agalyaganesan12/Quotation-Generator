import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  preview?: string;
  onUpload: (base64: string) => void;
  onRemove?: () => void;
  error?: string;
}

export function FileUpload({
  label,
  accept = 'image/png, image/jpeg',
  maxSizeMB = 2,
  preview,
  onUpload,
  onRemove,
  error,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    setUploadError('');

    // Validate file type
    const validTypes = accept.split(',').map((t) => t.trim());
    if (!validTypes.some((type) => file.type.match(type.replace('*', '.*')))) {
      setUploadError('Invalid file type');
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setUploadError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      onUpload(base64);
    };
    reader.onerror = () => {
      setUploadError('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] || null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files?.[0] || null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const displayError = error || uploadError;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-h-24 max-w-48 object-contain border rounded-md"
          />
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200
            ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${displayError ? 'border-red-500' : ''}
          `}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <div className="text-gray-500">
            <svg
              className="mx-auto h-8 w-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Drag and drop or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG up to {maxSizeMB}MB
            </p>
          </div>
        </div>
      )}

      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}
