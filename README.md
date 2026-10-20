# Mezric landing page

Standalone static marketing site for Mezric. It is intentionally independent from the Franlytics application: there is no backend, authentication, OAuth, API client, environment file, or secret in this repository.

## Local development

Requirements: Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. The page is a single static route with anchor navigation, so it works without a Mezric backend.

## Production build

```bash
npm run build
npm run preview
```

The generated site is in `dist/`.

## GitHub Pages setup

1. Create a new GitHub repository named `mezric-landing` and push this folder to its `main` branch. Do not push it into the Franlytics repository.
2. In GitHub, open **Settings > Pages** and set **Build and deployment > Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` installs dependencies, builds `dist/`, and deploys it with the official Pages actions.
4. Production assets use relative paths so both the project URL `https://tanlytics.github.io/mezric-landing/` and the custom domain `https://mezric.com/` work.

Do not use a repository secret for the Tally form ID. The published Tally form URL is public by design and is configured in `src/App.tsx`.

## Connect the Tally waitlist

1. Create and publish a Tally form.
2. Add these fields, using the closest Tally field type:
   - Email (email)
   - Name (short text)
   - Company/store name (short text)
   - What best describes you? (required multiple choice: independent operator/store owner, ecommerce growth team, agency managing multiple stores)
   - Ecommerce platform (multiple choice: Shopify, WooCommerce, Other, Not yet)
   - Ad platforms used (multi-select: Google Ads, Meta Ads, TikTok Ads, Other, None yet)
   - Biggest pain points today (optional long text)
   - Permission to contact them (required checkbox)
3. Add a Tally **Thank you** page with this message: `Thanks for joining Mezric. We will be in touch with a thoughtful update soon.`
4. Copy the form ID from the published form URL.
5. Replace `YOUR_TALLY_FORM_ID` in `src/App.tsx` with that ID. The placeholder panel will become the live embed after the next build.

The founding pilot is free for selected participants. No payment details are requested. Selected participants may be invited to onboarding and product-feedback sessions. Set a participant cap later if you want one; the page intentionally uses limited-pilot language until capacity is confirmed.

The page forwards common `utm_*` parameters and `source` from the landing-page URL to the Tally embed when a real form ID is configured. Add matching hidden fields in Tally if you want to store those values as columns.

## Send submissions to Google Sheets

Tally has a direct Google Sheets integration, so this site does not need a custom backend.

1. Publish the form and open its **Integrations** tab in Tally.
2. Choose **Google Sheets > Connect**.
3. Authorize the Google account that should own the responses.
4. Choose a new spreadsheet or an existing spreadsheet and sheet.
5. Turn on **Export existing submissions** if historical responses should be copied, then save the integration.

New submissions will be added as rows automatically. See the current Tally guide at https://tally.so/help/google-sheets-integration.

## Custom domain

1. This repository already includes `public/CNAME` with `mezric.com`.
2. In GitHub, open **Settings > Pages > Custom domain** and enter `mezric.com` if it is not detected automatically.
3. At your domain provider, add the four GitHub Pages `A` records for the apex domain: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
4. Wait for DNS verification, then enable HTTPS in GitHub Pages. DNS changes can take time to propagate.

When a custom domain is active, the project path is no longer used in the public URL. If you later move from a project site to a user or organization site, update `base` in `vite.config.ts` to `/` before building.

## Design notes

The visual language follows the existing Mezric product: Inter/system typography, indigo primary colors, slate borders, soft backgrounds, compact rounded controls, and product-like preview panels. The inline mark is kept independent from the wordmark so it remains legible at small sizes.
