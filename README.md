# aigama.app website

Plain HTML site hosted on GitHub Pages. No build step: what you see in the files is what goes live.

The site presents AiGAMA as an **internal tool**: used only by our team on Google Ads accounts we manage. There is no public sign-up or login.

## Files

| File | What it is |
|---|---|
| `index.html` | Homepage |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `cookies.html` | Cookie Policy |
| `assets/style.css` | All styles (colors, fonts, layout) |
| `assets/consent.js` | Cookie banner + Google Tag Manager (loads only after consent) |
| `assets/fonts/` | Fonts hosted on the site (no Google Fonts = GDPR-safe) |
| `assets/robot-*.svg`, `assets/logo.svg` | Mascots and logo |
| `CNAME` | Keeps the custom domain aigama.app — don't delete |
| `robots.txt`, `sitemap.xml` | Help Google find the pages |

Operator details (Mindaugas Stankus, Savanorių pr. 268, Lithuania, info@ / admin@aigama.app) are in section 1 of `privacy.html` and `terms.html`. Update both if anything changes.

## Privacy rules to keep the site GDPR-safe

- **Google Tag Manager** (`GTM-PM2RD9J4`) is in `assets/consent.js` and loads **only after the visitor allows Analytics or Marketing**. Never paste the GTM snippet into the HTML pages.
- **Inside GTM**, give each tag its consent setting (Consent Mode v2 is sent by the site):
  - **GA4** – All Pages, needs `analytics_storage`.
  - **Google Ads Conversion** – needs `ad_storage`. Suggested trigger: click on a `mailto:` link (contact).
  - **Google Ads Remarketing** – All Pages, needs `ad_storage` + `ad_personalization`.
  - **Conversion Linker** – All Pages.
- **In Google Analytics:** data retention 14 months.
- **Any other tag** (Meta, LinkedIn, Hotjar, enhanced conversions…): update `cookies.html`, section 6 of `privacy.html` and the banner text first, and raise `VERSION` in `assets/consent.js`.
- **Don't add Google Fonts, YouTube embeds or chat widgets** directly.
- **Someone asks for their data or deletion?** Answer within one month.

## How to update

**Small text change:** open the file on github.com → pencil icon → edit → **Commit changes**. Live in 1–2 minutes.

**Replace a file:** **Add file → Upload files**, drop in the file with the same name, commit. Files in `assets` must be uploaded inside the `assets` folder.

**Sections in `index.html`:** `<!-- HERO -->`, `<!-- WHAT IT DOES -->`, `<!-- HOW IT WORKS -->`, `<!-- WHO USES IT -->`, `<!-- DATA AND SECURITY -->`, `<!-- FAQ -->`.

**After changing a legal page:** update its "Last updated" date.

## Check it works

- https://aigama.app opens, with the "Internal tool" label
- Privacy, Terms and Cookies open from the footer
- The cookie banner shows on first visit; "Cookie settings" reopens it
- In GitHub → Settings → Pages: custom domain `aigama.app`, "Enforce HTTPS" ticked
