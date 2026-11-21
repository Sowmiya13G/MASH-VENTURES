---
name: responsive-laptop-mobile-design
description: "Implementation playbook for responsive laptop, desktop, tablet, and mobile UI engineering in Next.js & Three.js."
---

# Responsive Laptop & Mobile Design Playbook — MASH VENTURES

## Overview
This skill provides engineering guidelines and layout solutions for delivering high-performance, dark cinematic web experiences across mobile phones (`320px–480px`), tablets (`768px–1024px`), laptops (`1024px–1440px`), and desktop monitors (`1920px+`).

---

## 1. Responsive Layout Architecture

### Standard Container Pattern
```tsx
// src/components/ui/styles.ts
export const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
```
- **Mobile (`< 640px`)**: `px-4` (16px) leaves 343px of usable width on a 375px iPhone.
- **Tablet (`640px - 1024px`)**: `px-6` (24px) gives clean breathing room without sprawling.
- **Laptop / Desktop (`> 1024px`)**: `px-8` (32px) with `max-w-7xl` keeps content centered and readable.

### Responsive Grid System
| Content Type | Mobile (`< 640px`) | Tablet (`640px–1023px`) | Laptop (`1024px–1440px`) | Desktop (`> 1440px`) |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Section** | 1 Col (Text &rarr; 3D Canvas) | 1 Col stacked | 2 Col Split (`6 : 6`) | 2 Col Split (`6 : 6`) |
| **Character Cards** | 1 Col (`grid-cols-1`) | 2 Col (`grid-cols-2`) | 4 Col (`grid-cols-4`) | 4 Col (`grid-cols-4`) |
| **Experience Modalities** | 1 Col (`grid-cols-1`) | 2 Col (`grid-cols-2`) | 3 Col (`grid-cols-3`) | 3 Col (`grid-cols-3`) |
| **Feature Reasons** | 1 Col | 2 Col | 3 Col (`md:grid-cols-3`) | 5 Col (`lg:grid-cols-5`) |
| **Booking Form** | 1 Col (`grid-cols-1`) | 2 Col (`sm:grid-cols-2`) | 2 Col (`sm:grid-cols-2`) | 2 Col (`sm:grid-cols-2`) |

---

## 2. 3D WebGL Canvas Adaptations for Mobile & Laptop

### A. Dynamic DPR Capping
```tsx
<Canvas
  dpr={[1, typeof window !== "undefined" && window.innerWidth < 768 ? 1.0 : 1.5]}
  gl={{ powerPreference: "high-performance", antialias: true }}
>
```
High-density Retina mobile screens choke if forced to render full 3D at 3x DPR. Capping mobile at `1.0` maintains a stable 60–120 FPS.

### B. Scroll-Trapping Prevention
When users drag with one finger over a 3D orbit scene on mobile, they can get "trapped" and unable to scroll down the page.
```tsx
// Outer container allows native vertical scrolling:
<div className="relative touch-pan-y" style={{ touchAction: "pan-y" }}>
  <Canvas ... />
</div>
```

### C. Floating Mascot Screen Clearance
Mascot animations (like `RobotWhatsAppGuide`) must only activate on screens where they will not obstruct content:
```tsx
// Hide on mobile screens under 768px:
<div className="hidden md:block pointer-events-none fixed bottom-0 ...">
```

---

## 3. Typography & Heading Scaling

To prevent wide uppercase Orbitron headings from wrapping awkwardly:
```tsx
// Hero headline
<h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase leading-[1.02] tracking-tight font-display break-words">

// Section title
<h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-[1.08] tracking-tight font-display">

// Card title
<h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide">
```

---

## 4. Mobile Navigation & Touch Guidelines

1. **Tap Target Dimension**: Buttons, toggles, and nav links must be minimum `44px` height (`h-11`).
2. **Mobile Nav Drawer**:
   - `z-50` overlay below header.
   - Smooth backdrop blur and solid background (`bg-charcoal/95 backdrop-blur-lg`).
   - Links stacked vertically with `py-4` touch targets and subtle dividers.
   - Automatic close on route change and `Escape` key press.

---

## 5. Verification Checklist

- [ ] Viewport 320px: No horizontal scrolling (`document.documentElement.scrollWidth <= window.innerWidth`).
- [ ] Viewport 375px (iPhone standard): All text readable, touch targets > 44px.
- [ ] Viewport 768px (iPad portrait): Grids fold to 2 columns smoothly.
- [ ] Viewport 1024px–1440px (Laptop): 2-column hero balanced, 3-column experiences grid balanced.
- [ ] Form inputs: `text-base` (16px) font-size prevents Safari auto-zoom.
- [ ] Floating elements: WhatsApp button does not cover interactive content or form buttons.

