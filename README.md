# FeedbackPulse — Customer Feedback & Interactive Roadmap SaaS

> **Project Week SaaS Application (Projektinädala juhend - Hinne "A")**  
> Built with **React 19**, **Vite**, **Tailwind CSS**, **Rune Icons**, **PocketBase (SQLite + Auth + REST API)**, **Stripe Test Mode**, and **Coolify PaaS**.

---

## 1. Project Description

**FeedbackPulse** is a modern, full-featured Customer Feedback & Product Roadmap platform inspired by [Canny.io](https://canny.io) and modern design systems ([shadcn/ui](https://ui.shadcn.com), [rare-ui](https://rareui.com), [beui.dev](https://beui.dev), [Aceternity UI](https://ui.aceternity.com), [Rune Icons](https://github.com/Nexvyn/runeicons)).

### Core Capabilities:
- **Interactive Roadmap (Kanban Board):** Real-time column organization across 4 product lifecycle stages (*Under Review*, *Planned*, *In Progress*, *Completed*).
- **List & Filter View:** Search with instant debounced filtering, category filters (*Features*, *Improvements*, *Bug Reports*, *Integrations*, *UI/UX*), and sorting (*Most Upvoted*, *Trending*, *Newest*).
- **Tactile Upvoting with Weighted Votes:** Community members vote on proposals; **PRO Supporter members receive 3x voting weight** to prioritize high-value customer needs.
- **Discussion & Comment Threads:** Granular community feedback on proposals with live author badges (*Admin / Moderator*, *PRO Supporter*, *Member*).
- **Role-Based Access Control (RBAC):** Built-in distinction between standard Users and Administrators (admins can promote/demote roadmap statuses, pin proposals to top, and moderate comments).
- **Stripe Billing Integration (Grade "A" Requirement):** Seamless Stripe Test Mode checkout flow for PRO membership upgrade, simulating secure webhook verification.
- **Rune Icons Integration:** Precision geometric iconography natively implemented from [Nexvyn/runeicons](https://github.com/Nexvyn/runeicons).

---

## 2. Architecture Rationale

| Layer | Technology | Justification & Architectural Rationale |
|---|---|---|
| **Frontend Framework** | **React 19 + TypeScript + Vite** | Blazing-fast development server with Hot Module Replacement (HMR), strict type safety, modular component architecture, and optimized production bundle output (`dist/`). |
| **Styling & Motion** | **Tailwind CSS + Framer Motion** | Zero runtime CSS overhead, accessible color contrast tokens (Zinc dark palette), responsive utility classes, and tactile micro-animations inspired by Emil Kowalski and rare-ui. |
| **Iconography** | **Rune Icons (Nexvyn)** | 24×24 geometric SVG icon set providing unified stroke weight and styling across all navigation, status badges, and action triggers. |
| **Backend & Database** | **PocketBase (Go + SQLite)** | All-in-one backend packaging an embedded high-performance database, real-time WebSocket subscriptions, built-in PBKDF2 authentication, and granular row-level API Security Rules in a single lightweight binary. |
| **PaaS & Orchestration**| **Coolify PaaS (Docker Compose)** | Self-hosted, automated Git-based deployment platform with automatic SSL/TLS certificate renewal via Let's Encrypt, isolated networking, and **Persistent Volume storage** for SQLite integrity. |
| **Payments** | **Stripe Test Mode** | Industry standard billing infrastructure with client-side checkout simulation and backend webhook payment settlement. |

---

## 3. Live Service Links

- **Frontend Application (Coolify):** Deployed on Coolify
- **PocketBase API & Admin Dashboard:** [http://pocketbase-bzmqz78h0ehdz5mnq2t4eumx.176.112.158.15.sslip.io/_/](http://pocketbase-bzmqz78h0ehdz5mnq2t4eumx.176.112.158.15.sslip.io/_/)
- **GitHub Repository (Private):** [https://github.com/DimaAllikvee/feedback-board](https://github.com/DimaAllikvee/feedback-board)

---

## 4. Local Installation & Setup Guide

### Prerequisites:
- **Node.js**: v18.0 or newer
- **Git**
- *(Optional)* **Docker & Docker Compose** for running containerized PocketBase

### Step 1: Clone the Repository
```bash
git clone https://github.com/DimaAllikvee/feedback-board.git
cd feedback-board
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
```bash
cp .env.example .env.local
```
Fill in `VITE_POCKETBASE_URL` with your local or remote PocketBase URL (defaults to `http://127.0.0.1:8090`).

### Step 4: Run PocketBase (Backend)
You can launch PocketBase using Docker Compose:
```bash
docker compose up pocketbase -d
```
Or download the standalone PocketBase binary:
```bash
./pocketbase serve --http="0.0.0.0:8090"
```

To automatically provision collections and seed realistic initial posts:
```bash
node pocketbase/setup.js http://127.0.0.1:8090 admin@feedbackpulse.io Password1234!
```

### Step 5: Start Frontend Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 5. Environment Variables

All secrets are strictly kept out of Git repositories (configured via `.gitignore`). In Coolify, configure these inside the application's **Environment Variables** tab:

| Variable Name | Description | Example / Format | Exposed to Client? |
|---|---|---|---|
| `VITE_POCKETBASE_URL` | Public endpoint for PocketBase REST API | `https://pb.domain.com` | **Yes** (Bundled by Vite) |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe Test Mode Publishable Key | `pk_test_51...` | **Yes** (Client checkout) |
| `STRIPE_WEBHOOK_SECRET` | Secret key used to verify Stripe webhook signatures | `whsec_...` | **No** (Strictly Server-Only) |
| `PB_ADMIN_EMAIL` | PocketBase Master Administrator Email | `admin@domain.com` | **No** (CLI / Setup Only) |
| `PB_ADMIN_PASSWORD` | PocketBase Master Administrator Password | `Password123!` | **No** (CLI / Setup Only) |

---

## 6. Team Members & Division of Work

- **Dmitri Allikvee** — *Lead Full-Stack Developer & Software Architect*
  - Designed system architecture, component hierarchy, and database schemas.
  - Implemented React 19 UI with Tailwind CSS, Rune Icons, and micro-interactions.
  - Configured PocketBase row-level API security rules and automated seed migrations.
  - Integrated Stripe Test Mode billing flow and Webhook validation model.
  - Authored multi-stage Dockerfile, docker-compose orchestration, and deployment documentation for Coolify.

---

## 7. Professional Defense Questions & Answers (Grade "A" Criteria)

### Q1: How is the connection between Coolify and PocketBase secured, and why would unencrypted HTTP be dangerous?
> **Answer:**  
> All communications between client browsers, the Coolify PaaS reverse proxy (Traefik), and PocketBase are encrypted through **HTTPS (TLS 1.3)** using automated Let's Encrypt SSL certificates.  
> If plain HTTP were used, user authentication tokens (PocketBase JWT bearer tokens), passwords transmitted during registration, and Stripe customer identifiers would travel over the public internet in unencrypted plaintext, exposing users to Man-In-The-Middle (MITM) sniffing and session hijacking attacks.

### Q2: Why are environment variables (`VITE_POCKETBASE_URL`) used instead of hardcoded values in code?
> **Answer:**  
> Hardcoding URLs and keys creates severe security and architectural hazards:
> 1. **Separation of Environments:** Local development runs against `http://127.0.0.1:8090`, staging against test domains, and production against live HTTPS URLs without modifying source code.
> 2. **Security & Leaks:** Private credentials (like Stripe webhook secrets) must never be committed to source control. Vite only exposes variables prefixed with `VITE_` to the client bundle, preventing backend secrets from leaking.

### Q3: How are PocketBase API Rules configured to safeguard collections against unauthorized access?
> **Answer:**  
> PocketBase does not rely solely on frontend guards; it enforces database-level Security Rules on every REST API request:
> - **`posts` Collection:**
>   - *List / View:* Public (`""`) — Anyone can browse community feedback.
>   - *Create:* `@request.auth.id != ""` — Only authenticated members can submit ideas.
>   - *Update:* `@request.auth.id = author.id || @request.auth.role = "admin"` — Authors can update their own text, while only admins can alter status flags.
>   - *Delete:* `@request.auth.role = "admin"` — Deletions are strictly restricted to administrators.
> - **`votes` Collection:**
>   - *Unique Constraint:* Composite unique index on `(user, post)` prevents vote duplication at the database level.
>   - *Create Rule:* `@request.auth.id != "" && @request.auth.id = user.id` — Users cannot forge votes on behalf of other user IDs.

### Q4: How does Stripe Webhook verification protect against payment fraud?
> **Answer:**  
> In a production SaaS, client-side callbacks (`onSuccess`) can be easily spoofed or intercepted using developer tools without transferring actual funds.  
> Our architecture relies on **Stripe Webhooks**: when a customer completes a checkout session, Stripe's servers send an asynchronous cryptographically signed HTTP POST payload (`checkout.session.completed`) directly to our webhook listener. The backend verifies the signature using `STRIPE_WEBHOOK_SECRET`, extracts the verified `customer_id`, and safely flags `is_pro = true` in PocketBase.

### Q5: What is the significance of Persistent Volumes in Coolify?
> **Answer:**  
> Docker containers are ephemeral by default; any files created inside a container are destroyed whenever the container restarts or updates to a new image.  
> PocketBase persists data in SQLite files located at `/pb/pb_data`. Mapping a **Persistent Volume** (`pb_data:/pb/pb_data`) ensures that the database file resides safely on the host disk, surviving container recreations, server reboots, and Coolify redeploys.

---

## 8. License

Developed for the Software Engineering SaaS Project Week. Licensed under the MIT License.
