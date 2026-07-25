# Mel's Cafe — Website

Multi-page-ready static site: tabbed menu, add-to-cart, and WhatsApp checkout.

## Project structure
```
mels-cafe-website/
├── index.html          # markup + SEO meta + structured data
├── package.json        # local dev / deploy scripts
├── README.md           # this file
├── src/
│   ├── styles.css       # all styling
│   └── script.js        # menu tabs, cart logic, WhatsApp checkout
└── assets/
    └── images/           # your compressed photos
```

## Run it locally
```bash
npm install
npm start          # serves at http://localhost:3000
```
No build step — it's plain HTML/CSS/JS, so any static host works too (just double-click `index.html`, though a local server is better for testing image paths).

## Deploy
- **Netlify / Vercel / GitHub Pages / cPanel** — upload the whole folder as-is, keeping `src/` and `assets/` alongside `index.html`.
- Quick CLI options are wired up in `package.json`:
  ```bash
  npm run deploy:netlify
  npm run deploy:vercel
  ```

## Before you launch — please confirm/edit:
1. **Hours** — I didn't have a full weekly schedule from your listing, so the Visit section says "text us to confirm today's closing time." Add real hours in `index.html`, inside `<ul class="visit-list">`.
2. **Prices I couldn't confirm** — Burgers, sandwiches, lunch specials, kids menu, and the salad bar didn't have listed prices, so I used reasonable placeholder prices. Search `data-price=` in `index.html` to find and adjust any of them.
3. **Lunch Buffet / Seafood Buffet pricing** — the photo of your buffet sign was too blurry to read reliably, so those cards say "Ask Today's Price" instead of guessing. Add real numbers in `index.html` once you confirm — search for `Ask Today's Price`.
4. **WhatsApp number** — set to +1 (270) 589-1499 (your listed text number). To change it, edit the `WHATSAPP_NUMBER` constant near the top of `src/script.js`.
5. **Domain** — meta tags currently point to a placeholder `melscafeleitchfield.com` — swap in your real domain once you have one, so the SEO tags and structured data are accurate. Search `melscafeleitchfield.com` in `index.html`.

## What's included
- Sticky header with cart button + mobile menu toggle
- Hero built from your exterior photo
- Scrolling chalkboard-style specials ticker
- Full tabbed menu (Appetizers, Burgers & Sandwiches, Lunch Specials, Sides, Kids Menu, Desserts, Big Plates) — every item adds to a slide-in cart
- Buffet section using your salad bar, fruit tray, and pastry photos
- Pantry section for jarred goods, cart-enabled
- Reviews section, embedded map, footer with contact info
- WhatsApp checkout — cart builds an itemized message straight to your number
- Local SEO: Restaurant schema (JSON-LD), meta description/OG tags, semantic headings
