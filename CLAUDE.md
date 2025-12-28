# CLAUDE.md

## 🔄 Project Awareness & Context

- Always read `PLANNING.md` at the start of a new conversation to understand the project's architecture, goals, and constraints.
- Check `TASK.md` before starting work. If the task isn't listed, add it with a date.
- Maintain consistent naming, file structure, and architecture patterns throughout the codebase.
- Reference existing patterns in the codebase before creating new implementations.

## 🧱 Code Structure & Modularity

- **Maximum 500 lines per file.** If a file approaches this limit, refactor into smaller modules.
- Organize code by feature/responsibility:
  ```
  src/
  ├── components/     # UI components (common/, form/, pdf/, preview/)
  ├── services/       # Business logic (storage, validation)
  ├── hooks/          # Custom React hooks
  ├── types/          # TypeScript type definitions
  ├── utils/          # Pure utility functions
  ├── constants/      # Static configuration values
  └── contexts/       # React context providers
  ```
- Use relative imports within packages.
- Use barrel exports (`index.ts`) to simplify imports.

## 🧪 Testing & Reliability

- Create unit tests for all new features and utilities.
- Update existing tests when logic changes.
- Maintain a `tests/` folder structure mirroring the source structure.
- Each test file should cover:
  - Expected use case
  - Edge case
  - Failure scenario

## ✅ Task Completion

- Mark finished tasks in `TASK.md` immediately upon completion.
- Document newly discovered sub-tasks under "Discovered During Work" section.

## 📎 Style & Conventions

### JavaScript/TypeScript
- Use TypeScript as primary language
- Follow consistent naming conventions:
  | Type | Convention | Example |
  |------|------------|---------|
  | Components | PascalCase | `CompanyDetailsForm.tsx` |
  | Hooks | camelCase with `use` prefix | `useLocalStorage.ts` |
  | Utils | camelCase | `calculations.ts` |
  | Types | PascalCase | `QuoteFormData` |
  | Constants | UPPER_SNAKE_CASE | `DEFAULT_TAX_RATE` |
- Use Prettier for formatting
- Use Zod for validation
- Use react-hook-form for form state

### Documentation
- Write JSDoc comments for every exported function
- Add "Reason:" comments explaining non-obvious logic

## 📚 Documentation & Explainability

- Update `README.md` when features change or dependencies shift.
- Include usage examples in documentation.
- Document architectural decisions in `PLANNING.md`.

## 🧠 AI Behavior Rules

### Do
- Ask clarifying questions rather than assuming missing context
- Suggest improvements based on best practices
- Explain trade-offs when making architectural decisions
- Follow existing patterns in the codebase
- Confirm file paths and module names exist before referencing

### Don't
- Never fabricate libraries, APIs, or functions that don't exist
- Never delete code unless explicitly instructed
- Never assume missing context without asking
- Never make changes outside the requested scope

## 🛠️ Tech Stack Reference

| Category | Technology |
|----------|------------|
| Frontend | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Forms | react-hook-form + Zod |
| PDF | @react-pdf/renderer |
| Storage | LocalStorage |
| Container | Docker |

## 📂 Project Structure

```
D:\Claude_Project\
├── .claude/              # Claude configuration
├── PRPs/                 # Product Requirement Prompts
├── agents/               # Agent definitions
├── examples/             # Example applications
│   └── quotation-generator/
├── skills/               # Skill definitions
│   ├── frontend/
│   └── backend/
├── CLAUDE.md             # This file
├── INITIAL.md            # Feature template
├── PLANNING.md           # Architecture docs
└── TASK.md               # Task tracking
```
