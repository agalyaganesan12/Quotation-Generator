# React Frontend Skill

## Overview

Build modern React applications using TypeScript, establishing proper component architecture and managing application state effectively.

---

## Initial Setup

### Vite + React + TypeScript
```bash
npm create vite@latest project-name -- --template react-ts
cd project-name
npm install
```

### Essential Dependencies
```bash
# Core
npm install react-hook-form zod @hookform/resolvers

# PDF Generation
npm install @react-pdf/renderer

# Utilities
npm install uuid date-fns

# Dev
npm install -D @types/uuid
```

### Tailwind CSS v4
```bash
npm install -D tailwindcss @tailwindcss/vite
```

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* src/styles/globals.css */
@import "tailwindcss";
```

---

## Directory Structure

```
src/
├── components/
│   ├── common/      # Reusable UI (Button, Input, Modal)
│   ├── form/        # Form sections
│   ├── pdf/         # PDF components
│   └── preview/     # Preview modals
├── hooks/           # Custom hooks
├── services/        # Business logic, storage
├── types/           # TypeScript interfaces
├── utils/           # Pure utility functions
├── constants/       # Static configuration
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

---

## Type Safety Foundation

### Interface Patterns
```typescript
// Base interface
interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Extended interface
interface User extends BaseEntity {
  name: string;
  email: string;
}

// Props interface
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Type-Only Imports
```typescript
// IMPORTANT: Use type-only imports for types
import type { User, ButtonProps } from './types';
import type { UseFormRegister } from 'react-hook-form';
```

---

## Component Patterns

### Reusable UI Component
```tsx
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  isLoading,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

### Form Component with Validation
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(2, 'Name too short'),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Dynamic List with useFieldArray
```tsx
import { useFieldArray } from 'react-hook-form';
import type { Control } from 'react-hook-form';

interface ItemsTableProps {
  control: Control<FormData>;
}

export function ItemsTable({ control }: ItemsTableProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.name`)} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => append({ name: '', quantity: 1 })}>
        Add Item
      </button>
    </div>
  );
}
```

---

## LocalStorage Persistence

```typescript
// services/storageService.ts
const STORAGE_KEY = 'app_data';

export const storageService = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`${STORAGE_KEY}_${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`${STORAGE_KEY}_${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(`${STORAGE_KEY}_${key}`);
  },
};
```

---

## PDF Generation with @react-pdf/renderer

```tsx
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

interface PDFProps {
  title: string;
  content: string;
}

export function MyDocument({ title, content }: PDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>{title}</Text>
        <View>
          <Text>{content}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Download function
export async function downloadPDF(props: PDFProps, filename: string) {
  const blob = await pdf(<MyDocument {...props} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
```

---

## Best Practices

### Do
- Use TypeScript strict mode
- Implement proper error boundaries
- Handle loading states
- Use react-hook-form for forms
- Validate with Zod schemas
- Consider accessibility (ARIA labels, semantic HTML)

### Don't
- Use `any` type
- Skip error handling
- Ignore TypeScript errors
- Mix sync and async patterns
- Hardcode sensitive values

---

## Common Gotchas

1. **Type Imports**: Always use `import type` for type-only imports when using `verbatimModuleSyntax`

2. **Tailwind v4**: Uses `@import "tailwindcss"` instead of `@tailwind` directives

3. **React-PDF Bundle**: Large size (~1.8MB) - use lazy loading:
   ```tsx
   const PDFViewer = lazy(() => import('./PDFViewer'));
   ```

4. **Form Reset**: Call `reset()` after successful submission

5. **Key Props**: Always use unique, stable keys in lists (not array index for dynamic lists)
