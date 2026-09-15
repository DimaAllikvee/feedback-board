# UI/UX Engineering Rules & Mandatory Pre-Check Protocol

Whenever working on UI/UX, components, styling, motion, or design architecture in this project, you **MUST ALWAYS** inspect and follow the established best practices and ready-made solutions from the following primary sources:

## Mandatory Reference Sources

1. **Design System Standards & Quality Gate:**
   - [Design System Checklist](https://www.designsystemchecklist.com/)
   - Requirements: Strict color contrast tokens, semantic HTML (`<article>`, `<dialog>`, `<nav>`, `<header>`), descriptive `aria-label`, visible keyboard `:focus-visible` rings, responsive fluid spacing.

2. **Micro-Interactions & Motion Principles:**
   - [Emil Kowalski — You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)
   - Requirements: Snappy spring curves (`cubic-bezier(0.16, 1, 0.3, 1)` or snappy damping), zero gratuitous delay, tactile button pops (`scale(0.96)`), respect `prefers-reduced-motion`.

3. **Motion Primitives & Micro-Components:**
   - [beui.dev / starc007/ui-components](https://github.com/starc007/ui-components)
   - Inspect for: `animated-counter`, `animated-badge`, `animated-toast-stack`, `action-swap`.

4. **Rare & Delightful Interactions:**
   - [rare-ui / swamimalode07/rare-ui](https://github.com/swamimalode07/rare-ui)
   - Inspect for: `delete-button` (animated lid confirmation), `emoji-reaction` (spring emoji reaction bar), `notification-bell`, `folder-component`.

5. **Foundational Shadcn Primitives:**
   - [shadcn/ui](https://github.com/shadcn-ui/ui)
   - Inspect for: Accessible Dialogs, Dropdowns, Tooltips, Cards, Form Fields, and Radix primitives.

6. **Cal.com Enterprise Design System (Primary SaaS Pattern Library):**
   - [coss.com/ui / cosscom/coss](https://github.com/cosscom/coss)
   - Inspect for: Enterprise dark mode styling, field validation patterns, filter bars, segmented tabs, and clean dashboard layouts.

7. **Production SaaS Blocks & Templates:**
   - [ReUI / keenthemes/reui](https://github.com/keenthemes/reui)
   - Inspect for: Kanban boards, data-grid filters, and production-tested application blocks.

8. **Iconography Standard:**
   - [Rune Icons / Nexvyn/runeicons](https://github.com/Nexvyn/runeicons)
   - Every single icon across the application MUST use the official geometric SVGs from Rune Icons.

---

## Core Operational Rules

1. **Never Invent From Scratch:** Before creating a UI element, inspect the above 8 repositories and registries. Pick the battle-tested pattern, copy/adapt its structure, and customize it to fit the design system.
2. **Language Isolation:** The codebase, UI text, labels, and documentation are strictly in **English**. User communication remains in **Russian**.
3. **Tactile Feedback:** Every button, vote counter, and status changer must provide immediate tactile and visual response.
