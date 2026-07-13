# NetCentric Computing — Assignments 01 & 02

**Temple Emmanuel Essien**
Matric: AK22/PHS/CSC/042
Course: NetCentric Computing

Live site: **https://templeessien-042.github.io**

---

## Overview

Two deliverables, deployed together as a single site and joined by a persistent
navigation bridge that appears on every page.

| | Assignment | Location |
|---|---|---|
| **01** | Five-page portfolio site | `/` |
| **02** | Retail storefront | `/store/` |

---

## Assignment 01 — Portfolio

Five linked pages, hand-written in Notepad. No frameworks, no page builders,
no editor assistance.

- `index.html` — Landing page. Carries the comment form.
- `about.html` — Profile
- `services.html` — Capabilities
- `projects.html` — Coursework breakdown
- `contact.html` — Direct contact form

All five share a single stylesheet (`style.css`) and a consistent navigation
system. Markup is semantic — landmarks, headings in order, labels bound to
their inputs.

**Stack:** HTML5, CSS3

---

## Assignment 02 — Ledger Supply Co.

A retail front-end for cold-storage hardware. Six products, priced in Naira.

Working features:
- Add to cart
- Increment / decrement quantity
- Remove line item
- Live subtotal, shipping, and total
- Checkout with generated order reference
- Empty cart

**Stack:** HTML5, CSS3, vanilla JavaScript

### How the cart works

The single source of truth is the `cart` array in `store.js`. Nothing reads the
DOM to determine what is in the basket — the DOM is a *rendering* of the array,
discarded and rebuilt whenever the array changes.

Every operation follows the same shape: mutate `cart`, then call `renderCart()`.

Shipping is a flat ₦3,500, waived on orders over ₦150,000.

---

## The bridge

A fixed switcher sits in the corner of every page on both sites. It reports
which site you are currently on, displays the matric number, and links to the
other site in one click.

This is the required cross-site navigation button.

---

## Comment channel

The landing page carries a comment form wired to a delivery service. Submissions
are sent directly to my inbox.

**Dr. Anietie — this is the channel for further instructions.**

---

## Structure
