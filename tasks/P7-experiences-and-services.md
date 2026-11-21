# Task P7 — Experiences & Brand Activations

## Objective
Showcase MASH VENTURES' robotic services, experiential marketing capabilities, and event categories in accessible, high-prestige DOM cards.

## Requirements
- **Service Categories**:
  - Mall Appearances & Spectacles.
  - Corporate Events & Product Launches.
  - Brand Activations & High-Impact Marketing.
  - Private VIP Celebrations & Tech Expos.
- **SEO & Accessibility**:
  - 100% semantic HTML (`<article>`, `<section>`, `<h2>`, `<p>`).
  - Schema.org JSON-LD structured data for Google Search rich snippets.
  - Fast Largest Contentful Paint (LCP) with zero dependence on WebGL for core text.

## Implementation Checklist
- [x] Experiences routes and data models built in `src/data/experiences.ts`.
- [x] Server-rendered accessible cards in `ExperiencesSection.tsx`.
- [x] Dynamic SSG routes generated for all individual experiences (`/experiences/[slug]`).
- [x] Structured JSON-LD integration in `src/app/layout.tsx`.

