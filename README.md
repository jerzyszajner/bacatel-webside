# Baca Tel – Business Card Website

Modern single-page website for Baca Tel (mobile phones shop, Przeworsk) – HTML, CSS, vanilla JS.

**Live:** [https://bacatel.netlify.app/](https://bacatel.netlify.app/)

## Project Structure

```
bacatel-website/
├── index.html          # Main page
├── README.md
├── package.json
├── src/
│   ├── css/
│   │   ├── reset.css   # Reset (margin, padding, box-sizing)
│   │   ├── fonts.css   # Font loading (Cormorant Garamond, DM Sans)
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── header.css
│   │   ├── buttons.css
│   │   ├── sections.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   ├── utilities.css
│   │   ├── main.css    # Entry point (imports)
│   │   └── main.min.css # Built, minified (npm run build:css)
│   ├── js/
│   │   ├── theme.js    # Dark mode toggle
│   │   ├── nav.js      # Mobile menu (hamburger)
│   │   ├── gallery.js  # Image carousel (Swiper)
│   │   ├── hours.js    # Hero hours status (open/closed)
│   │   ├── scroll.js   # Scroll-to-top, active nav, button visibility
│   │   ├── map.js      # Map iframe lazy-load
│   │   ├── main.js     # Entry point (init modules)
│   │   └── main.min.js # Built, minified (npm run build:js)
│   └── assets/
│       ├── fonts/      # Cormorant Garamond, DM Sans (npm run build:fonts)
│       ├── icons/     # SVG icons + favicon (npm run build:favicons)
│       └── images/    # Source PNG + WebP from build (npm run build:images)
```

## Build

```bash
npm install
npm run build
```

| Script | Description |
|--------|-------------|
| `npm run build` | Full build (images, favicons, fonts, CSS, JS) |
| `npm run build:images` | Optimize images, generate WebP |
| `npm run build:favicons` | Generate favicon variants |
| `npm run build:fonts` | Build font subsets |
| `npm run build:css` | Minify CSS → `main.min.css` |
| `npm run build:js` | Minify JS → `main.min.js` |

## Local Development

Open `index.html` in a browser or use a local server:

```bash
python -m http.server 8080
# or
npx serve .
```

## Features

- **index.html** – Semantic structure, SEO meta, Open Graph, JSON-LD (LocalBusiness), gallery
- **Swiper** – Gallery carousel (CDN with SRI integrity)
- **Dark mode** – System preference + manual toggle, no flicker on load
- **Hours status** – Hero section shows open/closed based on business hours
- **Responsive** – Mobile-first, hamburger menu
- **Accessibility** – Skip link, ARIA labels, reduced motion support
- **Performance** – WebP images, lazy-loaded map iframe, minified assets

## Images

Store source images in `src/assets/images/`. After adding or changing images, run `npm run build:images` to generate WebP variants.

## Lighthouse Optimization

- **Images** – WebP format, responsive `srcset`, `width`/`height` to prevent CLS
- **Fonts** – Async loading (non-blocking)
- **CSS/JS** – Minified (`main.min.css`, `main.min.js`). Run `npm run build` after changes
- **Contrast** – Colors meet WCAG AA

## Deployment

Copy files to the server. Ensure `sitemap.xml`, `robots.txt` and `.htaccess` (if using Apache) are in the domain root.
