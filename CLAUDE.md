# Rentalo website

Plain HTML/CSS/JS static site, no build step, published by GitHub Pages from `main` (root).

- Keep each page to one screen with no scrolling on phones (test iPhone SE 375x667 and up). Extra info goes in on-demand panels (`Rental details`, FAQ dialog).
- One primary call to action: the WhatsApp button. Contacts for Juan and Natalia live in the FAQ dialog.
- Use the `modern-web-guidance` skill for any HTML/CSS/JS change.
- **Browser support:** Baseline widely available. Newly available features are fine with the lightweight fallbacks the guides describe (no polyfill libraries).
- Images: WebP, 1200x800, explicit width/height; first carousel slide `fetchpriority="high"`, other slides `fetchpriority="low"`.
- Bump the `?v=` query on `assets/css/styles.css` and `assets/js/app.js` when they change.
- Australian English ("tyre", "licence").
