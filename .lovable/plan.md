

## Problem

The Open Graph and Twitter Card meta tags in `index.html` reference `/og-image.png`, but that file was deleted earlier. Social media preview cards will show no image.

## Plan

### 1. Generate a new OG image (1200×630px)

Create a professional OG image programmatically using the existing brand assets:
- Use the S&L Exteriors logo (`public/logo.png`) centered on a branded background
- Include the tagline "Roofing, Siding & Exterior Services"
- Include "Northern Illinois & Nashville, TN"
- Output to `public/og-image.png` at 1200×630px

### 2. Update meta tags in `index.html`

Update the `og:image` and `twitter:image` URLs to point to the published site's domain (`https://home-enhancer-hub.lovable.app/og-image.png`) so they work immediately, or keep the `trustsandl.com` domain if that's where the site is deployed.

### Technical Details

- Generate the image using Python (Pillow) with the logo overlaid on a dark background matching the site's color scheme
- The image will be saved directly to `public/og-image.png`
- Meta tag URLs will be updated to reference the correct hosted path

