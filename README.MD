# Handcrafted Furniture Workshop Gallery

**Ticket ID:** ENG-15994  
**Epic:** Core Infrastructure Overhaul  
**Priority:** P1 (High)  
**Story Points:** 5  
**Assignee:** Shashank Vishwakarma [PDIT-FTE-11454]  
**Reporter / Module Lead:** Amit Sharma  

---

## 1. Project Overview
The Handcrafted Furniture Workshop Gallery is a lightweight, accessible digital inventory management tool built for floor staff. It eliminates reliance on manual paper records and spreadsheets, preventing data loss and speeding up floor operations.

---

## 2. Technical Stack & Architectural Constraints
- **HTML:** Pure Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`). Zero external frameworks (No React).
- **CSS:** Vanilla CSS adhering to a monochromatic corporate design system and a 16px/32px spacing scale. Zero external CSS libraries (No Tailwind, No Bootstrap).
- **JavaScript:** Pure Vanilla JavaScript (`"use strict"` mode) with zero runtime dependencies.

---

## 3. Requirements Traceability

### 3.1 Happy Path
- **Instant Search & Multi-Filter:** Real-time search across piece titles, wood species, and joinery methods.
- **Stock Tracking:** Automatic calculation of catalog totals and filtered results count.
- **Piece Logging:** Floor staff can input and immediately commit new furniture pieces to memory state.

### 3.2 Unhappy Path (Edge Cases)
- **Empty States:** When no catalog records match a search query or filter, an accessible "No data found" container displays with a "Reset Filters" action.
- **Bad Connectivity (Slow 3G Simulation):** An integrated network latency simulator renders an animated visual spinner during async catalog queries.
- **Invalid Inputs:** Submitting incomplete or malformed piece forms halts submission, highlights offending fields in red (`.input-error`), and surfaces targeted validation messages.

### 3.3 Non-Functional Requirements (NFRs)
- **Accessibility (a11y):** Keyboard navigable skip link, explicit form labels, ARIA landmarks, and high-contrast styling targeting a 100% Lighthouse Accessibility score.
- **Telemetry Simulation:** Standardized logging to developer console:
  `[Analytics] User interacted with Handcrafted Furniture Workshop Gallery - <Action>`
- **Security:** In-memory XSS sanitization routine strips script injections and special characters prior to catalog insertion.

---

## 4. Local Execution
1. Clone or extract the repository.
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Safari).
3. Open Developer Tools (`F12`) to verify console analytics logging and run a Lighthouse audit.