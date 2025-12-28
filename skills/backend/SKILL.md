# Backend Skill (Placeholder)

## Overview

This project is currently **frontend-only** with client-side data storage (LocalStorage). No backend is required for the MVP.

---

## Future Backend Considerations

If backend functionality is added in future phases, consider:

### Technology Options
| Option | Use Case | Pros |
|--------|----------|------|
| Node.js + Express | Simple API | JavaScript ecosystem |
| FastAPI (Python) | Performance | Auto docs, validation |
| Firebase | Serverless | Quick setup, scaling |
| Supabase | PostgreSQL | Open source Firebase |

### Potential Features
- [ ] User authentication
- [ ] Quote history storage
- [ ] Client database
- [ ] Email PDF to clients
- [ ] Cloud backup

---

## API Design (Future)

### Endpoints
```
POST   /api/quotes          Create quote
GET    /api/quotes          List quotes
GET    /api/quotes/:id      Get quote
PUT    /api/quotes/:id      Update quote
DELETE /api/quotes/:id      Delete quote

POST   /api/clients         Create client
GET    /api/clients         List clients

POST   /api/email           Send quote via email
```

### Data Models
```typescript
// Quote stored in database
interface StoredQuote {
  id: string;
  userId: string;
  quoteNumber: string;
  client: ClientDetails;
  items: QuoteItem[];
  totals: QuoteTotals;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Client database
interface StoredClient {
  id: string;
  userId: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  address: string;
  quotes: string[]; // Quote IDs
}
```

---

## Current Architecture

```
┌─────────────────────────────────────┐
│           Browser                    │
├─────────────────────────────────────┤
│  React App                          │
│  ├── Forms (react-hook-form)        │
│  ├── PDF Generation (@react-pdf)    │
│  └── Storage (LocalStorage)         │
└─────────────────────────────────────┘
```

No server required. All data stays on user's device.

---

## Migration Path

When ready to add backend:

1. **Choose Backend**: FastAPI or Node.js
2. **Set Up Database**: PostgreSQL or MongoDB
3. **Add Authentication**: JWT or OAuth
4. **Create API Routes**: RESTful endpoints
5. **Migrate Storage**: LocalStorage → API calls
6. **Add Email Service**: SendGrid or Resend

---

## References

- FastAPI: https://fastapi.tiangolo.com/
- Express.js: https://expressjs.com/
- Supabase: https://supabase.com/
- Firebase: https://firebase.google.com/
