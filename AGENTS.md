# Agent Guidelines & UI/UX Protocol

## Project: FeedbackPulse (Feedback Board SaaS)
- **Primary Language of Code & UI:** English
- **Communication with User:** Russian
- **Target Grade:** "A" (Project Week Guide)

## Mandatory UI/UX Reference Sources
Whenever you work on UI, components, styling, animations, or UX flows, you **MUST ALWAYS** inspect ready-made solutions from these 8 sources before writing code:

1. **[Design System Checklist](https://www.designsystemchecklist.com/)** — Accessibility, focus rings, contrast, spacing tokens.
2. **[Emil Kowalski — You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)** — Snappy springs, no lag, purposeful feedback.
3. **[starc007/ui-components (beui.dev)](https://github.com/starc007/ui-components)** — Motion primitives, animated badges, animated numbers.
4. **[swamimalode07/rare-ui (rareui.com)](https://github.com/swamimalode07/rare-ui)** — Unique delight components (`delete-button`, `emoji-reaction`, etc.).
5. **[shadcn/ui](https://github.com/shadcn-ui/ui)** — Primitives, dialogs, dropdowns, cards.
6. **[cosscom/coss (coss.com/ui)](https://github.com/cosscom/coss)** — Cal.com's official design system (Primary pattern library for SaaS filters, headers, and forms).
7. **[keenthemes/reui (reui.io)](https://github.com/keenthemes/reui)** — High-level SaaS blocks, Kanban boards, and data layouts.
8. **[Nexvyn/runeicons](https://github.com/Nexvyn/runeicons)** — Mandatory icon library for all SVG icons.
9. **[jakubkrehel/skills (interfaces.dev)](https://github.com/jakubkrehel/skills)** — UI engineering & polish guidelines (installed in `.agents/skills/`: `better-ui`, `better-typography`, `better-colors`, `better-interface`, etc.).
10. **[21st.dev](https://21st.dev)** — 1,000+ community-built UI components (Tailwind + Framer Motion components).
11. **[aicss.dev](https://aicss.dev)** — UI blocks for AI agent interactions.
12. **[ui.halaska.com](https://ui.halaska.com)** — Components for AI products.
13. **[vibeprompts.dev](https://vibeprompts.dev)** — 286 components with ready-to-use prompts.
14. **[styles.refero.design](https://styles.refero.design)** — High-quality design.md examples.
15. **[agent-memory.dev](https://agent-memory.dev)** — Persistent memory for coding agents.
16. **[kage.design](https://kage.design)** — Real product UI you can copy directly as an AI prompt or MCP.

**Rule:** Do not create UI from scratch. Inspect the repositories, adapt existing verified components, and integrate them smoothly.

---

## Ref.tools Principles: Anti-Slop AI Design Protocol (Matt Dailey)
Whenever designing or modifying UI with AI, adhere strictly to these 7 principles:

1. **Always Consider the Whole (No Whack-a-Mole Design)**
   - Lay out all constraints first (tokens, workflows, states).
   - Never apply isolated spot-fixes that randomly prioritize some elements and break overall cohesion.
   - Keep a cohesive mental model: changes must respect the entire layout system.

2. **Remove Stuff (De-Slop / Eliminate Agent Litter)**
   - AI agents instinctively over-decorate: adding extra copy, decorative badges, redundant lines, duplicate labels, and unneeded wrappers.
   - For **every single element**, ask: *"Do I actually need that?"*
   - Strip out visual clutter, tighten copy, and retain only purposeful, high-signal UI.

3. **Combat Prototype Gravity**
   - Do not settle for the first draft simply because it is already in the codebase.
   - Test alternative variants and push past the initial scaffolding.

4. **Component Isolation & Showcase**
   - Keep a clean separation between view components and business logic.
   - Maintain a showcase / styleguide view to test components in isolation.

5. **Test with Real Data & Live Deploys**
   - Always evaluate designs against real database content, realistic text lengths, and live browser rendering.

6. **Steal Proven Solutions (Curate, Don't Reinvent)**
   - High-quality UX patterns have already been solved by top-tier products.
   - Combine best-of-class patterns from Cal.com, Linear, and shadcn.

7. **Taste Refinement (The Agricultural Threshing Approach)**
   - Critique every detail relentlessly: test focus states, hit areas, optical alignment, and typography until the experience feels effortless, crisp, and confident.


