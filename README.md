# Sun Rise by Abeeha's Beauty Salon — website

Six static pages. No build step, no database, no monthly software cost.
Upload the whole folder to any host (Netlify, Cloudflare Pages, GitHub Pages,
Hostinger, cPanel) and it works.

```
index.html      Home
services.html   Full service menu (90+ treatments)
bridal.html     Bridal packages + enquiry form
gallery.html    Filterable photo gallery
about.html      Story, standards, team
contact.html    Booking form, hours, map
styles.css      All styling
site.js         All behaviour
favicon.svg     Browser tab icon
og-cover.png    Preview image for WhatsApp / Facebook links
sitemap.xml     robots.txt     .nojekyll
```

**Everything sits in one folder — no subfolders.** That matters: if you move
`styles.css` or `site.js` anywhere else, the site loses all its styling.
When uploading to GitHub, select every file at once and drop them at the top
level of the repository.

## The five things to do before going live

**1. Add your photographs.**
Create an `images/` folder. Everywhere you see a coloured block with a label,
the HTML has a comment above it explaining the swap. Replace:

```html
<div class="ph ph--c">Bridal portrait</div>
```

with:

```html
<img src="images/bride-01.jpg" alt="Barat bridal makeup with gold jewellery"
     loading="lazy" width="900" height="1200">
```

Use vertical 3:4 photos for the arched frames, squares for the Instagram strip.
Save them under 300 KB each — most of your visitors are on mobile data.

**2. Add prices.**
In `services.html`, every line has `<span class="price">On request</span>`.
Replace the words with the amount, e.g. `<span class="price">Rs 2,500</span>`.
Same on `bridal.html` inside each `<p class="pack__price">`.
Leaving them as "On request" is a valid choice — it drives more WhatsApp
conversations, which is usually where you close the booking.

**3. Swap in your real Google Map.**
Google Maps → search the salon → Share → Embed a map → copy the `<iframe>`.
Paste it over the existing iframe on `index.html` and `contact.html`.
While you are there, correct the `latitude` / `longitude` in the structured
data block at the top of `index.html` — right-click your salon pin on Google
Maps and the coordinates are the first item in the menu.

**4. If you buy a custom domain later.**
The site currently points at
`https://bilalaivideo-hash.github.io/sunrise-salon/`. If you move to your own
domain, search every file for that address and replace it. It appears in the
canonical links, Open Graph tags, `sitemap.xml` and `robots.txt`.

**5. Update the reviews.**
The three quotes on the home page are from your current Google reviews.
Refresh them every few months, and update the `4.4` and `39` figures in the
reviews section and in the structured data.

## How booking works

There is no server. Both forms build a WhatsApp message from what the visitor
typed and open it in WhatsApp — she presses send, you receive a normal chat
with her name, phone, service, date and time already written out.

Every "Book" button on the service menu does the same thing with the service
name filled in.

To change the number, edit `WHATSAPP` at the top of `assets/site.js` and
search-replace `923056745624` across the HTML files.

## What is already handled

- Mobile-first, tested down to 380 px
- Sticky WhatsApp button on desktop, call/WhatsApp bar on mobile
- Works with JavaScript switched off (the service menu uses native
  `<details>`, so it opens and closes without any script)
- Keyboard navigation and visible focus rings throughout
- `prefers-reduced-motion` respected
- Unique title and meta description per page, targeting "beauty salon Vehari",
  "bridal makeup Vehari", "hydra facial Vehari", "ladies salon Vehari"
- `BeautySalon` structured data with address, hours, phone and 4.4/39 rating,
  so Google can show your stars and hours in search results
- Total page weight under 40 KB before images

## Design notes

The recurring arch is the signature — it comes from the shape of a jharokha
niche, and it frames every portrait on the site. The palette is a sunrise over
brick: deep maroon, blush, warm cream, antique gold used only for hairlines
and hover states. Headings are set in Fraunces, body text in Jost, and the
Urdu lines in Noto Nastaliq Urdu.

If you change one thing, change it in `assets/styles.css` at the top — every
colour, font and spacing value on the site comes from that one token block.


## About og-cover.png

This is the picture that appears when someone shares your link on WhatsApp,
Facebook or Instagram. Right now it is a plain branded card. Replace it with a
real photograph the moment you have one — a strong bridal shot with the salon
name on it will get far more taps. Keep the same filename and keep it
1200 × 630 pixels.

WhatsApp caches previews aggressively. After you replace the file, paste the
link into Facebook's Sharing Debugger and press "Scrape Again" to force a
refresh.
