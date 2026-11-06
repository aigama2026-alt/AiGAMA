# aigama.app website

Plain HTML site on GitHub Pages. **All files are in one folder, with no subfolders.**
It presents AiGAMA as an internal tool: team access only, no public sign-up.

## Files
- `index.html` (home), `privacy.html`, `terms.html`, `cookies.html`
- `style.css` (look), `consent.js` (cookie banner + Google Tag Manager GTM-PM2RD9J4, loads only after consent)
- `logo.svg`, `robot-hello.svg`, `robot-think.svg`
- `source-sans-3-latin-*.woff2` + `font-license.txt` (fonts hosted here, no Google Fonts)
- `CNAME` (domain aigama.app, don't delete), `robots.txt`, `sitemap.xml`

## Upload
GitHub repo → **Add file → Upload files** → select all files → drag in → **Commit changes**.
Same file name = replaces the old one.

## Edit
Open a file on github.com → pencil icon → edit → **Commit changes**. Live in 1–2 minutes.
After changing a legal page, update its "Last updated" date.

## Keep it GDPR-safe
- Never paste the GTM snippet into the HTML. It is already in `consent.js` and waits for consent.
- In GTM: GA4 needs `analytics_storage`; Google Ads conversion + remarketing need `ad_storage` (+ `ad_personalization` for remarketing). Conversion Linker on all pages.
- New tag or service? Update `cookies.html` and `privacy.html` first, and raise `VERSION` in `consent.js`.
- Data requests: answer within one month.
