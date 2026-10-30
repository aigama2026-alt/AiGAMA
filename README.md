# aigama.app website

Plain HTML site hosted on GitHub Pages. No build step: what you see in the files is what goes live.

## Files

| File | What it is |
|---|---|
| `index.html` | Homepage |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `cookies.html` | Cookie Policy |
| `assets/style.css` | All styles (colors, fonts, layout) |
| `assets/main.js` | The "Get early access" popup |
| `assets/consent.js` | Cookie banner (Accept / Reject) |
| `assets/fonts/` | Fonts hosted on the site (no Google Fonts = GDPR-safe) |
| `assets/robot-*.svg`, `assets/logo.svg` | Mascots and logo |
| `CNAME` | Keeps the custom domain aigama.app — don't delete |
| `robots.txt`, `sitemap.xml` | Help Google find the pages |

## Before going live (one time)

1. **Legal pages** are drafts, not legal advice. Have them checked if you can.
   Operator: Mindaugas Stankus, Savanorių pr. 268, Lithuania. It appears in section 1 of `privacy.html` and section 1 of `terms.html`. If you form a company or move, update all of these.

2. **Connect the sign-up form** (free):
   - Create an account at https://formspree.io and make a new form.
   - Copy the form ID (looks like `xyzabcde`).
   - In `index.html`, find `https://formspree.io/f/YOUR_FORM_ID` and replace `YOUR_FORM_ID` with your ID.
   - Sign-ups now arrive in your email and in the Formspree dashboard.

## Privacy rules to keep the site GDPR-safe

- **Don't add Google Fonts, Google Analytics, YouTube embeds, Facebook pixels or chat widgets** directly. They send visitor data to other companies. If you want analytics later, load it only inside `loadAnalytics()` in `assets/consent.js` (it then runs only after "Accept"), and add it to `cookies.html` and section 5 of `privacy.html` first.
- **Formspree:** in your Formspree account, accept their Data Processing Agreement (DPA). Only collect what the form already asks for.
- **New service provider?** Add it to section 5 of `privacy.html` and change the "Last updated" date.
- **Someone asks for their data or deletion?** Answer within one month. Delete them from Formspree and your email.
- **Unsubscribe:** every early-access email you send must include a way to unsubscribe.
- **New type of cookie?** Raise `VERSION` in `assets/consent.js` so everyone is asked again.

## Upload to GitHub (first time)

1. Open your repository on github.com.
2. Delete the old `index.html`, `privacy.html`, `terms.html` (or just overwrite them in the next step).
3. Click **Add file → Upload files**, drag in **everything from this folder** (including the `assets` folder), and click **Commit changes**.
4. Wait 1–2 minutes and open https://aigama.app (press Ctrl+F5 / Cmd+Shift+R to skip the cache).

## How to update later

**Small text change**
1. On github.com, open the file (for example `index.html`).
2. Click the pencil icon (Edit).
3. Find the text (Ctrl+F), change it, then click **Commit changes**.
4. Live in 1–2 minutes.

**Replace a whole file or image**
- Click **Add file → Upload files**, drop in the new file with the **same name**, commit.

**Where things are in `index.html`**
Each section starts with a comment: `<!-- HERO -->`, `<!-- 3 STEPS -->`, `<!-- NOT JUST AI -->`, `<!-- RESULTS -->`, `<!-- FEATURES -->`, `<!-- PRODUCTS -->`, `<!-- FAQ -->`, `<!-- CTA -->`, `<!-- EARLY ACCESS POPUP -->`.

**Add a FAQ question**
Copy one line that starts with `<details class="card">` and change the question and answer.

**Change colors**
At the top of `assets/style.css`, under `:root`.

**After changing Privacy or Terms**
Update the "Last updated" date on that page.

## Check it works

- The site opens at https://aigama.app
- Privacy, Terms and Cookies open from the footer
- The cookie banner shows on first visit; "Cookie settings" in the footer reopens it
- The sign-up form can't be sent without ticking the consent box
- "Build my ads" opens the popup with the website already filled in
- A test sign-up arrives in Formspree
- In GitHub → Settings → Pages: custom domain is `aigama.app` and "Enforce HTTPS" is ticked
