# EnRoute

Website for EnRoute Travel & Lifestyle: flights, hotels, car rentals and airport transfers, arranged through one travel partner.

Plain HTML, CSS and JavaScript. No build step and nothing to install.

## Run it

**Quickest:** open `index.html` in your browser.

**As a local website:** from this folder run

```
python3 -m http.server 8080
```

then open http://localhost:8080. Stop it with `Ctrl+C`.

An internet connection is needed for the photos (Unsplash) and fonts (Google Fonts).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The home page: every section of the design |
| `login.html`, `sign.html`, `forgot.html`, `reset.html` | Account pages |
| `style.css` | All styles for the site |
| `main.js` | Menus, booking tabs, FAQs, popups and the assistant |
| `about.html`, `service.html`, `testimonial.html`, `ai.html` | Forward to their sections on the home page |
| `bus.html`, `bus.css` | Earlier bus booking page (not yet restyled) |
| `images/` | Logo and images |

## Not connected yet

The booking, contact, login and sign-up forms have no backend yet. The login and sign-up forms point to `login.php` and `sign.php`, which still need to be built.
