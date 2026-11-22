# Rentalo website

A simple, one-screen site for Rentalo: car hire in Melbourne and e-bike hire in Melbourne and Adelaide.

Live: https://neozs.github.io/rentalo-website/ (GitHub Pages, published from the `main` branch).

## Layout

```
index.html            Cars page
ebikes.html           E-bikes page
assets/
  css/styles.css      All styles
  js/app.js           Carousel, WhatsApp links, FAQ dialog fallbacks
  img/
    brand/            Logo and favicon
    cars/             Car photos (WebP, 1200x800)
    ebikes/           E-bike photos (WebP, 1200x800)
    og-image.jpg      WhatsApp / social link preview (1200x630)
source-images/        Original full-size photos (not published, ignored by git)
```

## Updating

- **Photos:** export at 1200x800 WebP into `assets/img/cars` or `assets/img/ebikes`, using lowercase-hyphen names.
- **FAQ answers:** edit the `<dialog id="faq">` section near the bottom of each page.
- Every push to `main` goes live within a minute or two.
