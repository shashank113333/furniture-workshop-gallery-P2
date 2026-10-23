# Handcrafted Furniture Workshop Gallery
**Ticket ID**: ENG-15994 | **Sprint / Deliverable**: Client Project 4  
**Engineer**: Shashank Vishwakarma (Employee ID: PDIT-FTE-11454)  
**Organization**: Prodesk IT  

---

## 1. Project Overview
A high-performance, single-page workshop inventory gallery built with pure semantic HTML5, vanilla CSS, and vanilla JavaScript (zero external dependencies or frameworks). Engineered to replace manual paper sheets and Excel logs for furniture workshop floor staff.

## 2. Key Features
- **Happy Path Execution**: Instant real-time search across timber species, furniture type, and dimensions with zero page reload.
- **Bilingual Engine**: Complete localized switching between English and Hindi (`हिन्दी`) for all UI labels, timber names, joinery terms, and status badges.
- **Dual Currency Engine**: Real-time price conversion between `$ USD` and `₹ INR` with Indian numbering formatting (`en-IN`).
- **Device Photo Upload**: Intake form supports local device gallery uploads (`FileReader.readAsDataURL()`) with persistent image rendering.
- **Unhappy Path & Edge Cases**:
  - *Empty Search State*: Displays clear "No data found" alert with an instant reset button.
  - *Network Throttling*: Auto-detects Slow 3G network connectivity via DevTools and displays an active loading spinner.
  - *Input Validation*: Real-time form validation highlighting invalid fields with red borders and error messages.
- **Enterprise Standards**: 100% Lighthouse Accessibility (a11y), input XSS sanitization, and real-time telemetry console logging.

## 3. Setup & Running Instructions
1. Clone or extract the project folder:
   ```bash
   git clone https://github.com/shashank113333/furniture-workshop-gallery-P2.git