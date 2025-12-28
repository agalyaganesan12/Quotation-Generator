# PRP Template - Base v1.0

## Purpose

> **Context is king.** This template provides a structured format for defining feature implementations with built-in validation and clear success criteria.

### Core Principles
- Information-dense documentation
- Validation loops for executable testing
- Progressive success through iterative refinement

---

## Goal

### What We're Building
<!-- Describe the specific deliverable -->

### Why
<!-- Business justification -->

### User-Visible Behavior
<!-- What the user will see/experience -->

### Success Criteria
<!-- Checkboxes for measurable outcomes -->
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## All Needed Context

### Official Documentation
<!-- Links to relevant docs with specific sections -->
| Resource | URL | Key Sections |
|----------|-----|--------------|
| Doc 1 | | |

### Example Files
<!-- Reference implementations in codebase -->
| File | Purpose | Patterns to Follow |
|------|---------|-------------------|
| `path/to/file` | | |

### Known Gotchas
<!-- Common pitfalls to avoid -->
1. Gotcha 1
2. Gotcha 2

---

## Project Structure

### Current State
```
project/
├── existing/
│   └── files/
```

### Desired State
```
project/
├── existing/
│   └── files/
├── new/
│   └── files/
```

---

## Implementation Blueprint

### Data Models
<!-- ORM models, Pydantic schemas, validators -->
```typescript
// Type definitions
```

### Task Breakdown
<!-- Ordered list with specific file modifications -->

| # | Task | File(s) | Pattern Reference |
|---|------|---------|-------------------|
| 1 | | | |
| 2 | | | |

### Pseudocode
<!-- Key implementation patterns -->
```
// Critical logic flow
```

---

## Integration Points

### Configuration
```yaml
# New config entries
```

### Route Registration
```typescript
// Router setup
```

---

## Validation Loop

### Level 1: Syntax & Linting
```bash
# Linting commands
npm run lint
npx tsc --noEmit
```

### Level 2: Unit Tests
```bash
# Test commands
npm run test
```

### Level 3: Integration Testing
```bash
# Manual verification commands
```

---

## Final Validation Checklist

- [ ] All tests pass
- [ ] Linting passes
- [ ] Type checking passes
- [ ] Manual verification complete
- [ ] Error handling implemented
- [ ] Documentation updated

---

## Anti-Patterns (Avoid)

1. Don't skip validation
2. Don't hardcode values
3. Don't mix sync/async patterns
4. Don't ignore error handling
5. Don't skip tests

---

## Confidence Rating

**X/10** - Reasoning for confidence level
