# Leavenworth Tourist Directory — Design Document

A static **directory website for tourists visiting Leavenworth, Washington**,
with a cozy, warm Christmas/holiday focus. Visitors browse real local
businesses — lodging, dining, festival events, and the ski resort — filtered
and searchable, with festival-season guidance built in.

Plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools.
Hosted on GitHub Pages.

---

## 1. Project Summary (planning prompt)

- **What it is:** a tourist directory for Leavenworth, WA
- **Site name:** Leavenworth Winter Guide
- **Audience:** travelers who enjoy Christmas/holiday activities — festival-goers,
  families, couples on winter weekends (many driving over from Seattle)
- **Goal of the site:** help visitors **find and contact local businesses** —
  browse by category, search, and click through to book or call
- **Tone:** cozy and warm — like a cabin with a fire going; helpful and
  factual, a trusted local guide, not an ad site
- **Pages:** Home, Christmas Festival, Ski Resort, Places to Stay, Places to Eat
- **Tech:** plain HTML, CSS, JavaScript — no frameworks

**Success criteria:** a visitor can find a place to stay, eat, or visit in
under a minute, and every listing gives them a way to act (call, map, website).

---

## 2. Site Structure

```
lily-site/
├── index.html              Home: hero, category browse, featured listings
├── christmas-festival.html Festival guide: dates, events, tips, FAQ
├── ski-resort.html         Ski resort guide + nearby winter activities
├── stay.html               Lodging directory
├── eat.html                Dining directory
├── styles.css              Single shared stylesheet
├── js/
│   └── main.js             Nav toggle, filtering, search (deferred)
└── images/                 Compressed photos, descriptive filenames
```

Shared header (site name + nav) and footer on every page. Relative paths only
(`./styles.css`, `./images/hero.jpg`) so it works on GitHub Pages.

**No individual listing detail pages** — each listing is a self-contained card
with everything a tourist needs (see §4). This keeps the site small, fast, and
maintainable. Detail pages can be added later if the directory grows.

---

## 3. Page-by-Page Design

### Home (`index.html`)
- **Hero:** Front Street with holiday lights. Headline: "Find your Leavenworth."
  Subtext: browse stays, food, and holiday fun in one place. CTA buttons to
  the four other pages.
- **Category browse:** four large cards — Christmas Festival / Ski Resort /
  Places to Stay / Places to Eat — each with a photo and one-line description.
- **Holiday spotlight:** 3–4 featured listings flagged as holiday picks
  (sleigh rides, Christmas shops, festival-view hotels).
- **Festival banner:** one-line Christmas Lighting Festival teaser with dates,
  linking to the festival page.
- **Footer:** nav links, "last updated" date.

### Christmas Festival (`christmas-festival.html`)
The seasonal anchor page — most winter visitors come for this.
- **Hero:** festival lights photo + this season's dates (placeholder dates in
  the prototype — verify against the official Leavenworth chamber site before
  launch, and re-verify each season).
- **What to expect:** lighting ceremony schedule and weekend activities
  (carolers, Santa, chestnuts, sleigh rides) as a simple timeline or card list.
- **Festival-weekend tips:** arrive early, parking/shuttle notes, dress warm.
- **Featured listings:** 3–4 Stay and Eat cards walkable to Front Street
  (reuse the standard listing card from §4).
- **FAQ accordion:** Is the festival free? What if there's no snow? When
  should I book lodging?

### Ski Resort (`ski-resort.html`)
- **Hero:** slope photo + quick facts (distance from town, drive time, season).
- **Resort overview:** terrain, lift tickets, rentals, lessons — factual, with
  prices and snow conditions always linked to the resort's official site.
  Feature **Stevens Pass** (~45 min from town over US-2); mention Mission
  Ridge as an alternative.
- **Getting there:** ~45 min over US-2 (verify drive time); check WSDOT pass
  conditions, carry chains.
- **Cross-links:** "Warm up after" → Eat page; "Make it a weekend" → Stay page.

### Places to Stay (`stay.html`)
- **Page header:** category name + one-sentence intro
- **Filter/search bar:** chips (Hotel / Cabin / B&B / Pet-friendly) + search box
- **Listing grid:** cards (see §4), mobile-first: 1 column → 2 → 3
- **Seasonal note box:** "December weekends sell out 2–3 months ahead — book early."

### Places to Eat (`eat.html`)
Same template as Stay:
- **Filter/search bar:** chips (German / Café / Fine dining / Family-friendly)
  + search box
- **Listing grid** of restaurant cards (see §4)
- **Seasonal note box:** "Book dinner ahead on Lighting Festival weekends —
  tables on Front Street fill fast."

---

## 4. Listing Card — the Core Building Block

Every listing on every category page uses this exact structure. This
consistency is what makes it a *directory* rather than a blog.

```html
<article class="listing-card" data-category="stay" data-tags="hotel,festival">
  <img src="./images/EXAMPLE.jpg" alt="One-line description of the photo">
  <div class="listing-body">
    <h3>Business Name</h3>
    <p class="listing-category">Hotel &middot; Downtown</p>
    <p class="listing-desc">2–3 sentence factual description: what it is,
       where it is, what makes it different.</p>
    <p class="listing-holiday">🎄 Open late on Lighting Festival weekends</p>
    <address>
      930 US Hwy 2, Leavenworth, WA 98826<br>
      <a href="tel:+15095551234">(509) 555-1234</a>
    </address>
    <a class="listing-link" href="https://example.com"
       rel="noopener noreferrer" target="_blank">Visit website</a>
  </div>
</article>
```

**Required fields per listing:**
| Field | Rule |
|---|---|
| Name | Real business name, as an `<h3>` |
| Category + area | e.g., "Café · Front Street" |
| Description | 2–3 sentences, **original writing**, factual third-person (good for search AND AI search) |
| Holiday note | Only if genuinely holiday-relevant — seasonal hours, festival-weekend status, booking urgency |
| Address | Real street address |
| Phone | `tel:` link |
| Website | Outbound link with `rel="noopener noreferrer"` |
| Photo | Compressed, real photo, `alt` text always |

**`data-tags`** powers search/filtering (e.g., `data-tags="german,beer-garden"`).
**A "Holiday Pick" badge** (CSS class on the card) highlights the best
Christmas-relevant listings.

---

## 5. Interactions (vanilla JS only)

| Feature | Where | Notes |
|---|---|---|
| Mobile nav toggle | All pages | Hamburger + `aria-expanded`; listeners in JS, never inline `onclick` |
| Category filter chips | Category pages | Show/hide cards via `data-tags`; "All" chip resets |
| Search box | Category pages | Case-insensitive match on name + description + tags; hides non-matching cards; shows "no results" message |
| FAQ accordion | Christmas Festival | `<button>` + `aria-expanded`, progressive enhancement |

All rendering is static HTML — JS only filters what's already on the page.
That means the directory still works with JavaScript disabled (good for SEO
and for the course's progressive-enhancement mindset).

---

## 6. Visual Design System

Defined once as CSS custom properties in `:root`:

```css
:root {
  /* Colors — cozy alpine holiday palette */
  --color-primary:   #2f4a3c;  /* deep pine green */
  --color-secondary: #9b2226;  /* cranberry red */
  --color-accent:    #c98a3d;  /* warm amber */
  --color-bg:        #faf5ec;  /* warm cream */
  --color-text:      #3a2f28;  /* warm dark brown */
  --color-surface:   #fffdf8;

  /* Type */
  --font-heading: 'Fraunces', Georgia, serif;
  --font-body: 'Nunito Sans', system-ui, sans-serif;

  /* Spacing scale */
  --space-sm: 0.5rem;
  --space-md: 1.5rem;
  --space-lg: 3rem;
}
```

- Fraunces (soft, rounded serif) for display headings; Nunito Sans for body;
  all font sizes in `rem`
- Mobile-first: base styles for phones, breakpoints at ~48rem and ~64rem
- Cozy details: warm cream background, rounded card corners (8–12px), soft
  warm-tinted shadows, generous padding — nothing stark or clinical
- Cards: warm white surface, subtle border/shadow, consistent padding
- Holiday Pick badge: cranberry background, white text, small caps
- Amber for CTAs and highlights; check contrast (amber on cream ≥ 4.5:1 —
  darken to `#a8702a` or similar for text-size uses)
- Real Leavenworth winter photos; every image has `alt` text

---

## 7. SEO & AEO (important for a directory)

- Unique `<title>` + meta description per page, e.g.
  "Where to Stay in Leavenworth WA — Hotels, Cabins & Inns | Leavenworth Winter Guide"
- One `<h1>` per page; listing names are `<h3>` under the page's `<h2>` sections
- Descriptive link text ("Visit Icicle Brewing website," never "click here")
- **AEO:** write every listing description in clear, factual third-person so
  AI assistants can quote it accurately — who, what, where, what makes it
  different. No marketing fluff.
- Semantic tags throughout: `header`, `nav`, `main`, `section`, `article`, `footer`

---

## 8. Quality Checklists

**Accessibility**
- [ ] `alt` on every `<img>` (empty `alt=""` only for decorative)
- [ ] One `<h1>` per page; no skipped heading levels
- [ ] Search input has a `<label for>`
- [ ] Filter chips are real `<button>`s with visible focus styles
- [ ] Text contrast ≥ 4.5:1 (check gold-on-white especially)

**Performance**
- [ ] Images resized/compressed before upload
- [ ] CSS `<link>` in `<head>`; JS with `defer`
- [ ] No JS libraries — everything is vanilla

**Directory integrity**
- [ ] Every listing has name, address, phone, and a working link
- [ ] Seasonal/holiday notes marked with a "verified [month year]" date
- [ ] No placeholder or invented businesses — real listings only

---

## 9. Content Rules

- **Original copy only** — never paste descriptions from Yelp, TripAdvisor, or
  business websites; write fresh, factual summaries.
- Verify hours, prices, and seasonal status against official sources each
  season; stale directory info destroys trust faster than anything else.
- Aim for **5–10 quality listings per directory page** at launch (10–20 total)
  rather than a long list of thin entries.

---

## 10. Build Phases

1. **Structure:** all five pages, semantic HTML skeleton, shared header/footer
2. **Design system:** `styles.css` custom properties, mobile-first grid, card component
3. **Directory content:** build the Stay page first (highest urgency for this
   audience), then Eat — real listings, real photos
4. **Festival & ski pages:** festival dates/events, resort overview, FAQ
5. **Interactions:** mobile nav, filter chips, search, FAQ accordion
6. **Polish & ship:** run the checklists in §8, deploy to GitHub Pages
