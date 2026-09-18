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

---

## Interface Cheat Sheet (interfaces.dev / Jakub Krehel)
Practical tips for making interfaces clearer, easier to use and more polished:

### User Interface
- When nesting elements, **make their border radius concentric**. The formula for the inner radius is: outer radius − gap between the elements.
- Prioritize **optical alignment** over **geometric alignment**.
- A button with text and an icon gets **slightly smaller padding on the side of the icon**.
- Use a layered `box-shadow` to give elements **depth** instead of using borders.
- Give images a `1px` outline, offset by `-1px`: black at `8%` opacity in light mode, white at `8%` in dark mode.
- Match the icon’s **stroke to the text next to it**.

### Animation
- Make elements **animate from the trigger** rather than the center. Set `transform-origin` based on the trigger’s position.
- For **menus people open often**, skip the opening animation and only animate when they close.
- Make **exit animations more subtle** than entrances. Move the element by a shorter distance as it fades out with `opacity` and a `4px` blur.
- Name the **exact properties** you want to animate in a transition. Never use `transition: all`.
- Make buttons **scale down slightly when pressed**. Use a scale between `0.95` and `0.98` with `transition: scale 200ms ease-out`.
- When icons swap, **fade one out as the other fades in**. Animate the new icon’s scale from `0.25` to `1`, opacity from `0` to `1` and blur from `4px` to `0px`. Reverse these for the old icon.
- Use CSS transitions for interactions so the animation **can change direction halfway through**. Use keyframes for sequences that only run once.
- **Disable all transitions** when switching between light and dark mode.
- If an element **randomly shifts by 1–2px while animating**, add `will-change: transform` to it. This is especially useful in Safari on iOS.
- When elements enter, **animate them in small groups** with a short delay between each group instead of animating one giant block.
- Prevent elements from **animating on page load**, unless it’s intentional.
- Keep frequent interactions **instant or very fast**, like an item changing color when you hover it.

### Typography
- Always use `.woff2` **font files** on the web, never `.ttf` or `.otf`.
- Use `font-variant-numeric: tabular-nums` in timers, counters, prices and tables. It gives every digit the same width which prevents layout shifts when the values change. Skip it if you’re already using a monospace font.
- Keep lines in articles and other long text to **60–75 characters**. Long form text that is wider than that is difficult to read.
- Use `text-wrap: balance` to **even out headings** and `text-wrap: pretty` on descriptions to prevent orphaned words. Use neither for long form text.
- Keep **long words, links and IDs inside their container** with `overflow-wrap: break-word`. Use `white-space: nowrap` to prevent labels and badges from wrapping.
- Set `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` **on the root layout** to make text appear sharper.
- Write text with **normal capitalization**. Use `text-transform` when you want to display it in uppercase or lowercase.
- Use **smart punctuation**: curly quotes, an en dash (–) for ranges, an em dash (—) for asides and an ellipsis (…) instead of three dots.
- Keep **underlines from crossing the tails of letters** like g and y. Use `text-underline-position: from-font` with `text-decoration-skip-ink: auto`.
- When you **shorten text with an ellipsis**, let people read the full text in a tooltip or an expanded view.

### Colors
- **Every step** in a color palette should have a purpose: page background, component hover, border, solid fill, body text. Don’t add steps that nothing uses.
- Components should use **semantic tokens** (`--color-text-secondary`), never primitives (`--blue-500`). The primitive is the raw value, the token is how the value is used.
- Name color tokens by **purpose**: `--color-accent-solid` instead of `--color-blue-button` or `--color-sidebar-gray`.
- Reserve `accent` **for the brand color** so `primary` never means both the brand and the main body text.
- Measure contrast against the background **directly behind an element**.
- Create a separate color palette **for dark mode** instead of inverting the light mode palette.
- Choose **one way to switch themes**: `prefers-color-scheme` or a `.dark` class. Don’t mix both.
- You can define **how colors blend** in a gradient. Use `in oklab` for even brightness, `in oklch` for more vivid colors in the middle or `in srgb` for more muted midtones.

### Accessibility
- Use **native HTML elements**: `<button>` for buttons and `<a>` for links, for example. Native elements already have a lot of accessibility and other expected behavior built in.
- Style `:focus-visible` instead of `:focus`. Don’t **remove the outline** without a replacement.
- Only use `tabindex="0"` and `tabindex="-1"`. **Positive values change the expected order** of the elements.
- Give **buttons that only have an icon** a descriptive `aria-label`. Never put `aria-hidden="true"` on an element that can be focused.
- Write **alternative text that explains the image’s purpose and what it shows**. Give decorative images `alt=""`.
- Give **every input a visible label** using `<label>`. Set its `type` and `inputmode` to match what people should enter.
- **Never block paste.** People paste in things like passwords and one-time codes.
- **Keep the submit button enabled** until the request starts. Check for errors when people submit. Mark invalid fields with `aria-invalid="true"`, connect each error message with `aria-describedby` and move focus to the first invalid field.
- Make **hit areas** at least `24x24px`. Aim for `44x44px` on touch screens and `40x40px` on desktop where possible. Make sure they never overlap.
- Use `pointer-events: none` on **decorative elements** like glows and gradients so events are never swallowed.
- Put hover styles inside `@media (hover: hover)`. On touch screens, `:hover` **stays active after a tap** and makes an item look selected.
- **Respect people’s reduced motion setting.** Put animations inside `@media (prefers-reduced-motion: no-preference)` so they only play for people who don’t have motion reduced.
- Use `role="status"` to **announce routine updates to screen readers**. Save `role="alert"` for urgent errors.
- **Never use color alone** to show a status change. Add an icon, a label or an underline too.
- Make the **skip-to-content link the first stop** when someone presses Tab.

### Layout
- Use `scroll-margin-top` to **leave space above headings** when people follow links to them.
- Leave **at least twice as much space between groups** as between items in a group. For example, use `8px` between items and `16px` or more between groups.

### Writing
- Start button labels with a **verb**: “Save draft” or “Delete project”, never “OK!” or a bare “Yes”.
- Make confirmation buttons **say what will happen**: “Delete project” next to “Cancel”.
- Use **the same label to move to the next step** throughout a flow. Choose “Continue” or “Next” and use it for every step.
- **Describe where a link goes**.
- Capitalize buttons, headings and labels **the same way everywhere**. Sentence case, like “Save changes”, is the safer default.
- Label toggles with **what happens when they’re on**: “Send read receipts”, not “Disable read receipts”.
- When a view is empty, **explain what belongs there** and give people one action to get started instead of nothing.
- Address the reader as **“you”**, not “the user”.


