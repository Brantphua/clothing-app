# Cloth & Form — local wardrobe organiser

This is a browser-first prototype for organising a wardrobe locally. It currently uses manual tagging with an AI-recognition placeholder, a simple visual fit profile, color-based pairing, and an illustrated mannequin preview.

The seeded wardrobe also includes 15 real-photo test samples from Unsplash. They are downloaded into `assets/sample-clothes/` and shown with a `photo sample` label. See `assets/sample-clothes/SOURCES.md` for the source list and license notes.

The fit profile uses five self-selected body-shape references: Hourglass, Pear, Rectangle, Inverted triangle, and Apple. They are used only as styling inputs and can be changed at any time.

## Run locally

From this folder, start any local static server. For example, with Python:

```powershell
py -m http.server 5173
```

Then open [http://localhost:5173](http://localhost:5173) in a modern browser.

The app stores pieces and settings in IndexedDB for the `localhost:5173` browser origin. Use **Export wardrobe** before clearing browser data or moving to another browser.

## Prototype boundaries

- Clothing categories: tops, bottoms, dresses, and outerwear.
- AI recognition: intentionally not connected; the add-piece panel explains the placeholder.
- Image generation: intentionally not connected yet.
- Image upload: stored locally and shown on the clothing card; the mannequin uses the selected item color and category as an illustrated preview.
- Recommendations: deterministic color compatibility with a user-selected fit profile.
