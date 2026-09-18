# Agent Guidelines & UI/UX Protocol

## Project: FeedbackPulse (Feedback Board SaaS)
- **Primary Language of Code & UI:** English
- **Communication with User:** Russian

## Mandatory UI/UX Reference Sources
Whenever you work on UI, components, styling, animations, or UX flows, you **MUST ALWAYS** inspect ready-made solutions from these 16 sources before writing code:

1. **[Design System Checklist](https://www.designsystemchecklist.com/)** ([GitHub](https://github.com/ardakaracizmeli/design-system-checklist)) — Accessibility, focus rings, contrast, spacing tokens.
2. **[Emil Kowalski — You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations)** ([GitHub Profile](https://github.com/emilkowalski)) — Snappy springs, no lag, purposeful feedback.
3. **[starc007/ui-components](https://github.com/starc007/ui-components)** ([beui.dev](https://beui.dev)) — Motion primitives, animated badges, animated numbers.
4. **[swamimalode07/rare-ui](https://github.com/swamimalode07/rare-ui)** ([rareui.com](https://rareui.com)) — Unique delight components (`delete-button`, `emoji-reaction`, etc.).
5. **[shadcn/ui](https://github.com/shadcn-ui/ui)** ([ui.shadcn.com](https://ui.shadcn.com)) — Primitives, dialogs, dropdowns, cards.
6. **[cosscom/coss](https://github.com/cosscom/coss)** ([coss.com/ui](https://coss.com/ui)) — Cal.com's official design system (Primary pattern library for SaaS filters, headers, and forms).
7. **[keenthemes/reui](https://github.com/keenthemes/reui)** ([reui.io](https://reui.io)) — High-level SaaS blocks, Kanban boards, and data layouts.
8. **[Nexvyn/runeicons](https://github.com/Nexvyn/runeicons)** — Primary icon library for SVG icons in the project.
9. **[jakubkrehel/skills](https://github.com/jakubkrehel/skills)** ([interfaces.dev](https://interfaces.dev)) — UI engineering & polish guidelines (installed in `.agents/skills/`: `better-ui`, `better-typography`, `better-colors`, `better-interface`, etc.).
10. **[21st.dev](https://21st.dev)** ([GitHub](https://github.com/21st-dev)) — 1,000+ community-built UI components (Tailwind + Framer Motion components).
11. **[aicss.dev](https://aicss.dev)** ([GitHub](https://github.com/kvnkld/aicss)) — UI blocks for AI agent interactions.
12. **[ui.halaska.com](https://ui.halaska.com)** — Components for AI products (by Chris Halaska).
13. **[vibeprompts.dev](https://vibeprompts.dev)** — 286 components with ready-to-use prompts.
14. **[styles.refero.design](https://styles.refero.design)** ([GitHub](https://github.com/referodesign/refero_skill)) — High-quality design.md examples & MCP.
15. **[agent-memory.dev](https://agent-memory.dev)** ([GitHub](https://github.com/rohitg00/agentmemory)) — Persistent memory for coding agents.
16. **[kage.design](https://kage.design)** — Real product UI you can copy directly as an AI prompt or MCP.

**Rule:** Do not create UI from scratch. Inspect the repositories, adapt existing verified components, and integrate them smoothly.

---

## Approved Free Icon Libraries & Solutions
When adding or updating icons in the project, use **[Nexvyn/runeicons](https://github.com/Nexvyn/runeicons)** as the primary set, or source clean, consistent vector SVGs from these 20 approved free icon libraries:

1. **[Lucide Icons](http://lucide.dev)** ([GitHub](https://github.com/lucide-icons/lucide)) — Beautiful & consistent stroke icons (community fork of Feather).
2. **[Phosphor Icons](http://phosphoricons.com)** ([GitHub](https://github.com/phosphor-icons/core)) — Flexible, clean icon family with multiple weights.
3. **[Tabler Icons](http://tabler.io/icons)** ([GitHub](https://github.com/tabler/tabler-icons)) — 5,000+ customizable open source SVG icons.
4. **[Heroicons](http://heroicons.com)** ([GitHub](https://github.com/tailwindlabs/heroicons)) — Hand-crafted Tailwind CSS / UI icons by the Tailwind team.
5. **[Google Fonts Icons / Material Symbols](http://fonts.google.com/icons)** ([GitHub](https://github.com/google/material-design-icons)) — Variable, optical size matched icons.
6. **[Bootstrap Icons](http://icons.getbootstrap.com)** ([GitHub](https://github.com/twbs/icons)) — 2,000+ crisp, battle-tested icons.
7. **[Remix Icon](http://remixicon.com)** ([GitHub](https://github.com/Remix-Design/RemixIcon)) — Neutral-style open source system symbols.
8. **[Iconoir](http://iconoir.com)** ([GitHub](https://github.com/iconoir-icons/iconoir)) — 1,500+ open-source icons with zero dependencies.
9. **[Ionicons](http://ionic.io/ionicons)** ([GitHub](https://github.com/ionic-team/ionicons)) — Premium designed icons for web, iOS, and Android.
10. **[Simple Icons](http://simpleicons.org)** ([GitHub](https://github.com/simple-icons/simple-icons)) — 3,000+ SVG icons for popular brands and technologies.
11. **[The SVG](http://thesvg.org)** ([GitHub](https://github.com/GLINCKER/thesvg)) — Curated SVG vector collections.
12. **[Iconify](http://iconify.design)** ([GitHub](https://github.com/iconify/iconify)) — Universal unified icon framework (200,000+ icons).
13. **[Feather Icons](http://feathericons.com)** ([GitHub](https://github.com/feathericons/feather)) — Minimalist, clean 24x24 stroke icons.
14. **[Radix UI Icons](http://radix-ui.com/icons)** ([GitHub](https://github.com/radix-ui/icons)) — Crisp 15x15 pixel-perfect icons from WorkOS / Radix.
15. **[Carbon Design System Icons](http://carbondesignsystem.com)** ([GitHub](https://github.com/carbon-design-system/carbon)) — IBM's enterprise-grade iconography.
16. **[Boxicons](http://boxicons.com)** ([GitHub](https://github.com/atisawd/boxicons)) — High quality web icons designed with simplicity.
17. **[MX Icons](http://mx-icons.vercel.app)** ([GitHub](https://github.com/ig-imanish/mx-icons)) — Modern, snappy icon collection for Next-gen apps.
18. **[Eva Icons](http://akveo.github.io/eva-icons)** ([GitHub](https://github.com/akveo/eva-icons)) — 480+ beautifully crafted open source icons (fill and outline).
19. **[Devicon](http://devicon.dev)** ([GitHub](https://github.com/devicons/devicon)) — Developer logos, programming languages, and framework marks.
20. **[css.gg](http://css.gg)** ([GitHub](https://github.com/astrit/css.gg)) — 700+ customizable pure CSS, SVG and Figma icons.

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


