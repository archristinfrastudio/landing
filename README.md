# Architect portfolio

A fast, photo-led portfolio site built with [Astro](https://astro.build), hosted free on GitHub Pages, and edited through [Pages CMS](https://pagescms.org) — no code needed to add or remove projects.

## What's inside

| Path | What it is |
|---|---|
| `src/content/projects/` | One file per project (title, type, year, photos, text) |
| `src/content/settings.json` | Studio name, headline, intro, quote and contact details |
| `src/assets/projects/` | Uploaded project photos (resized and compressed automatically on every build) |
| `src/styles/global.css` | Colours and fonts — change the theme here |
| `.pages.yml` | What the admin panel shows |
| `.github/workflows/deploy.yml` | Builds and publishes the site on every change |

Pages: Home, Works (with type filter), one page per project (with full-screen photo viewer), Studio, and a contact section on every page.

## One-time setup

1. **Create a repository** on GitHub (public, so Pages is free) and push this folder to its `main` branch.
2. **Turn on Pages:** repository → *Settings → Pages → Build and deployment → Source: GitHub Actions*.
3. Push any change (or run the workflow from the *Actions* tab). In a minute or two the site is live at `https://<username>.github.io/<repository>/`.
4. **Connect the admin panel:** go to [app.pagescms.org](https://app.pagescms.org), sign in with GitHub, install the Pages CMS app **for this repository only**, and open it.
5. **Give the architect access:** add his GitHub account as a collaborator (*Settings → Collaborators*) with write access. Turn on two-factor authentication for both accounts.

## Adding a project (for the architect)

1. Open the admin link and choose **Projects → Add entry**.
2. Fill in the name, location, year, type and short description.
3. Upload a **cover photo** and the **gallery photos**.
4. Switch on **Show on homepage** if it should appear under *Selected works*.
5. Press **Save**. The live site updates about a minute later.

To hide a project without deleting it, switch off **Published**. To change the order, use **Sort order** — smaller numbers come first.

Contact details, the headline and the studio text are under **Studio & contact details**. In the headline, put `*stars*` around a word to make it italic.

**Photos:** JPGs straight from the photographer are fine; the site makes small, fast versions automatically. Please avoid uploading files larger than about 10 MB each — the whole site must stay under GitHub Pages' 1 GB limit.

## Adding a custom domain later

1. Buy the domain (e.g. `studioname.in`).
2. Repository → *Settings → Pages → Custom domain*, enter it, and follow GitHub's DNS instructions at your registrar.
3. Tick **Enforce HTTPS** once it's available, and verify the domain under your GitHub account settings to prevent takeover.

No code changes are needed — the build picks up the new address automatically.

## Working on the code

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
```

Placeholder photos live in `src/assets/projects/` and were made with `scripts/make_placeholders.py`. Delete them (and the sample projects) once real projects are added.
