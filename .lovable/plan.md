

## Improve OG Image Quality

### Problem
The current OG image is basic — the logo floats on a plain dark background with simple centered text. It doesn't reflect the professional quality of the site.

### Plan

**Regenerate `public/og-image.png` (1200×630px)** with a significantly improved design:

1. **Background**: Use a gradient from the brand's dark navy (`hsl(210, 65%, 20%)`) to a slightly lighter navy, with a subtle geometric pattern or diagonal accent stripe in the brand's gold/accent color (`hsl(36, 90%, 52%)`)
2. **Layout**: Left-aligned content with the logo positioned prominently in the upper portion, creating a more editorial/professional composition rather than centered text
3. **Logo**: Place `public/logo-white.png` (white version) at a larger, more impactful size
4. **Typography**: 
   - Tagline "Roofing, Siding & Exterior Services" in a clean, bold white font
   - "Northern Illinois & Nashville, TN" in the gold accent color
   - "www.trustsandl.com" as a small footer element
5. **Accent details**: A gold accent bar or stripe element to add visual interest and brand consistency
6. **Bottom edge**: A thin gold/accent strip along the bottom (matching what appears in the current image)

### Technical Details
- Generate using Python (Pillow) with the white logo asset (`public/logo-white.png`)
- Use DM Sans font (downloaded from Google Fonts) for text to match the site
- Output directly to `public/og-image.png`, replacing the current version
- Keep the existing meta tag URLs in `index.html` (already correct with cache-busting `?v=2`)

