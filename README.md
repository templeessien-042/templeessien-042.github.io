# NetCentric Assignments 01 & 02

**Temple Emmanuel Essien** — AK22/PHS/CSC/042

Two sites, one deployment, joined by a persistent bridge switcher.

---

## What's in here

```
/
├── index.html        Landing page — carries the required comment box
├── about.html
├── services.html
├── projects.html
├── contact.html      ← Assignment 1: five linked pages
├── style.css         Shared stylesheet
├── README.md
└── store/
    ├── index.html    ← Assignment 2: retail storefront
    ├── store.css
    └── store.js      Cart logic — vanilla JS, no libraries
```

---

## Before you deploy: wire up the comment box

The form currently points at a placeholder. **It will not deliver anything until you fix this.**

1. Go to **formspree.io** and create a free account.
2. Create a new form. Copy the endpoint it gives you — it looks like `https://formspree.io/f/xyzabcde`.
3. Open `index.html`. Find `YOUR_FORM_ID` and replace the whole `action` URL with your endpoint.
4. Do the same in `contact.html`.
5. Also update `essien.temple@example.com` in `index.html` and `contact.html` to your real address.

Then **test it.** Submit a message yourself and confirm it lands in your inbox. Formspree will ask you to verify your email on the first submission.

---

## Deploying to GitHub Pages

1. Create a GitHub account if you don't have one. Use a username close to your name and matric — e.g. **`temple-ak22`** or **`essien-ak22042`**. This becomes your domain.
2. Create a new **public** repository named `<username>.github.io` (so: `temple-ak22.github.io`).
3. Upload every file, keeping the folder structure — `store/` must stay a folder.
4. Go to **Settings → Pages**, set the source to the `main` branch, root folder. Save.
5. Wait about a minute. Your site is live at:

   ```
   https://temple-ak22.github.io
   ```

   And the store at `https://temple-ak22.github.io/store/`

### Alternative: Netlify

Drag the whole folder onto **app.netlify.com/drop**. It deploys instantly. Then rename the site under Site settings → Change site name to something like `essien-ak22042`, giving you `essien-ak22042.netlify.app`.

---

## Checking it against the brief

- [ ] Five pages, all linked — Home, About, Services, Projects, Contact
- [ ] Retail store using HTML, CSS, and JavaScript
- [ ] Both hosted on a free domain
- [ ] Domain name resembles your name + reg number
- [ ] A button navigates between the two sites — that's the **bridge** in the corner, on every page
- [ ] Comment input box on the landing page
- [ ] **The comment box actually delivers to your inbox** — test this before submitting

---

## How the cart works

The single source of truth is the `cart` array in `store.js`. Nothing reads the DOM to work out what's in the basket — the DOM is a rendering of the array, thrown away and rebuilt on every change. Add, increment, decrement, remove, checkout: each one mutates the array, then calls `renderCart()`.

Shipping is a flat ₦3,500, waived over ₦150,000.
