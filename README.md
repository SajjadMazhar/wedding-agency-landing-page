# Aslam Digital Studio — Wedding Photography Website

A premium, visually rich website for **Aslam Digital Studio**, a wedding photography and videography studio. Built with React, Vite, and Framer Motion with cinematic animations, parallax effects, and responsive design across all devices.

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool with HMR
- **Framer Motion 13** — Animations, scroll-triggered reveals, page transitions
- **Three.js / React Three Fiber** — Particle effects (hero, gallery, contact backgrounds)
- **EmailJS** — Contact form submissions
- **CSS Custom Properties** — Theme system (dark/light mode)

## Features

- Full-screen cinematic hero with Ken Burns slideshow, parallax scroll, and floating SVG ornaments
- Dark/light mode toggle with localStorage persistence (defaults to dark)
- Gallery section with auto-scrolling marquee strips, featured showcase, full-collection modal, and keyboard-navigable lightbox
- Services section with immersive parallax image cards and staggered entrance animations
- Pricing section with customisable package display (currently showing a formal enquiry message)
- Contact section with split layout — info panel + form powered by EmailJS
- Multi-column footer with quick links, services, and contact details
- Three.js gold particle effects across hero, gallery, and contact sections
- Fully responsive from 360px to ultrawide displays
- 81 optimised gallery images (800px thumbnails + 1400px hero variants)
- 20 hero slides with unique taglines and Ken Burns configurations

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` (or next available port).

### Production Build

```bash
npm run build
```

Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file for contact form functionality:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
src/
  components/       # React components (Hero, Navbar, Services, Gallery, Pricing, Contact, Footer)
  context/          # Theme context provider
  data/             # Gallery images, hero slides, packages data
  styles/           # Global CSS with responsive breakpoints
public/
  gallery/          # Optimised images (thumbs/ and hero/ subdirectories)
  logo.png          # Studio logo
```

## Deployment

The project is configured for Firebase Hosting. Run:

```bash
npm run build
firebase deploy
```

## License

All rights reserved. This website is built for Aslam Digital Studio.
