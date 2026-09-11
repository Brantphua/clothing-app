# Cloth & Form — local wardrobe organiser

This is a browser-first prototype for organising a wardrobe locally. It uses local IndexedDB storage, DeepSeek V4.1 Flash clothing recognition, a simple visual fit profile, color-based pairing, and an illustrated mannequin preview.

The seeded wardrobe also includes 15 real-photo test samples from Unsplash. They are downloaded into `assets/sample-clothes/` and shown with a `photo sample` label. See `assets/sample-clothes/SOURCES.md` for the source list and license notes.

The fit profile uses five self-selected body-shape references: Hourglass, Pear, Rectangle, Inverted triangle, and Apple. They are used only as styling inputs and can be changed at any time.

## Run locally

From this folder, start the local app server:

```powershell
npm start
```

Then open [http://localhost:5173](http://localhost:5173) in a modern browser.

The server reads the DeepSeek key from `C:\Users\jared\OneDrive\Desktop\secrets.toml.txt` using its `deep_key` entry. To use a different location, set `WARDROBE_SECRET_FILE` before starting the server:

```powershell
$env:WARDROBE_SECRET_FILE = 'C:\path\to\secrets.toml.txt'
npm start
```

The key is read only by `server.mjs`; it is never sent to the browser. Do not commit the secret file or paste the key into project files.

The app stores pieces and settings in IndexedDB for the `localhost:5173` browser origin. Use **Export wardrobe** before clearing browser data or moving to another browser.

## Prototype boundaries

- Clothing categories: tops, bottoms, dresses, and outerwear.
- AI recognition: the add-piece panel sends the selected image to the local server, which calls DeepSeek's `deepseek-flash` model (the current V4.1 Flash model) and fills in editable name, category, color, fit, and pattern suggestions.
- Image generation: intentionally not connected yet.
- Image upload: stored locally and shown on the clothing card; the mannequin uses the selected item color and category as an illustrated preview.
- Recommendations: deterministic color compatibility with a user-selected fit profile.
