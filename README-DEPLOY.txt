VNF STORE — FINAL STATIC WEBSITE
================================

CONTENTS
- index.html, styles.css, app.js: complete responsive website
- data/products.json: clean product catalogue used by the website
- data/catalogue.csv: same catalogue in spreadsheet format
- images/: only product photos assigned to the products in the catalogue
- WhatsApp enquiry number: +91 98202 84333

CATALOGUE CLEANUP
- 59 unique product listings are included.
- Only products with at least one matching photo are included.
- Duplicate SKU listings are removed.
- Product descriptions are concise; supplied product fields such as sizes, colours,
  material and price remain in the catalogue when available.
- No stock, payment, delivery tracking or checkout availability is invented.

WHATSAPP
- Product enquiry buttons open WhatsApp with the product name, SKU and price prefilled.
- Cart enquiry opens WhatsApp with all selected products and quantities.
- The customer must review and press Send in WhatsApp.

LOCAL PREVIEW
- Open index.html in a browser for a quick preview.
- For best results, run a local static server from this folder:
    python -m http.server 8000
  Then open http://localhost:8000

HOSTING
NETLIFY:
1. Sign in at https://app.netlify.com/
2. Choose Add new site > Deploy manually (or drag-and-drop deploy).
3. Extract this ZIP and upload the VNF-Store-Website folder contents.
4. Netlify will provide a public URL that you can share with clients.

VERCEL:
1. Sign in at https://vercel.com/
2. Create a new project and import this folder from a Git repository,
   or use the Vercel CLI to deploy the extracted folder.
3. Use the project root as the site root; no build command is required.
4. Vercel will provide a public URL.

IMPORTANT
- This package is a static client-facing catalogue website. It does not contain a
  Google Sheets/Gmail database, customer accounts, online payments, order management,
  inventory synchronization or admin dashboard.
- WhatsApp enquiries are sent by the customer from their own WhatsApp after pressing Send.
- You must deploy the folder to obtain a public hosting link; this ZIP itself is not a live URL.
- Hosting-provider free-plan limits and commercial-use terms can change. Check the provider
  terms before using the site for a commercial store.
