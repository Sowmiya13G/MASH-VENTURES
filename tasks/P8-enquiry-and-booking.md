# Task P8 — Enquiry Flow & Direct WhatsApp Integration

## Objective
Enable clients and event organizers to book robotic character experiences effortlessly through a validated enquiry form and instant WhatsApp booking.

## Requirements
- **High-Conversion Booking Form**:
  - React Hook Form + Zod schema validation for robust client/server safety.
  - Event date picker, character preference, event category, and attendee capacity fields.
  - Clean error states with accessible ARIA attributes.
- **Instant WhatsApp Linkage**:
  - Floating WhatsApp action button with pre-filled inquiry text.
  - Direct booking links in Navbar and Hero CTAs.

## Implementation Checklist
- [x] Booking form implemented in `src/components/BookingForm.tsx`.
- [x] Server API endpoint implemented in `src/app/api/enquiry/route.ts`.
- [x] WhatsApp floating button with pulsing cyber ring implemented.
- [x] Direct click-to-chat triggers configured in navigation header.

