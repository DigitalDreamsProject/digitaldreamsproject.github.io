# Digital Dreams Project

A free browser-games website. Pick a thumbnail, click it, play.

## Deploy on GitHub Pages
1. Create a repo on GitHub (e.g. `digital-dreams-project`) and upload **all files in this folder** (keep `index.html` at the repo root).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`.
3. Your site goes live at `https://<username>.github.io/digital-dreams-project/` (name the repo `<username>.github.io` to use the root URL).

All paths are relative, so it works either way.

## Add a new game
1. Put the game in `games/<game-id>/` (with its own `index.html`).
2. Add the thumbnail to `assets/`.
3. Add an entry to `js/games.js`. It appears on the home page automatically.
