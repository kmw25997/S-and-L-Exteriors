# S and L Exteriors Website

Marketing website for S and L Exteriors, showcasing services, reviews, and contact information for local homeowners in the Hinckley, Illinois area.

## Development

- Install dependencies: `npm install`
- Start local dev server: `npm run dev`
- Run tests: `npm test`

## Quote Form Delivery (Vercel-friendly)

The quote form submits to a Formspree endpoint via `fetch` in `src/components/Hero.tsx`.

### Required setup

1. Create a Formspree form and copy the endpoint URL (example: `https://formspree.io/f/xxxxabcd`).
2. In Vercel project settings, add this environment variable:
   - `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxabcd`
3. For local development, create `.env.local` with the same variable.

### Where submissions go

- Submissions are delivered to the email inbox configured in your Formspree account for that form endpoint.