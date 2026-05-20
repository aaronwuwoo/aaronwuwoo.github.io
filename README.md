# My Personal Website

A simple, hand-built personal site. Edit it in VS Code, push it to GitHub, and host it for free on GitHub Pages.

---

## 📁 What's in here

```
my-website/
├── index.html      ← Page content (edit your name, bio, projects here)
├── style.css       ← All visual styling (colors, fonts, layout)
├── script.js       ← Scroll animations and small interactions
└── README.md       ← This file
```

---

## ✏️ Editing in VS Code

1. **Open the folder in VS Code**
   - File → Open Folder → select this folder.

2. **Find the bits to change**
   Every spot you should personalize is marked with `<!-- EDIT: ... -->` in `index.html`. Search for `EDIT:` (Cmd/Ctrl + F) to find them all quickly.

3. **Preview as you work**
   - Easiest: right-click `index.html` → **Open With Live Server** (install the "Live Server" extension by Ritwick Dey first — it auto-refreshes the page as you save).
   - Or just open `index.html` in your browser by double-clicking it.

4. **Change the colors / fonts**
   Open `style.css`. The first block (`:root { ... }`) holds every color and font in one place. Swap the hex codes there to retheme the whole site.

---

## 🚀 Putting it on GitHub (and the live web)

### One-time setup

1. **Make a GitHub account** at https://github.com if you don't have one.

2. **Install Git** (https://git-scm.com/downloads) — VS Code will use it.

3. **Create a new repository on GitHub**
   - Click the **+** in the top-right → **New repository**.
   - Name it `your-username.github.io` (replace `your-username` with your actual GitHub username — this exact name gives you a free site at `https://your-username.github.io`).
   - Leave it **Public**. Don't add a README (you already have one).
   - Click **Create repository**.

### Pushing this folder to GitHub

In VS Code, open the terminal (`` Ctrl + ` ``) and run these commands one at a time, in this folder:

```bash
git init
git add .
git commit -m "First commit"
git branch -M main
git remote add origin https://github.com/your-username/your-username.github.io.git
git push -u origin main
```

(Replace `your-username` with your actual GitHub username.)

GitHub may ask you to sign in — follow the prompts.

### Turning on GitHub Pages

1. Go to your repo on github.com.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Source**, select **Deploy from a branch**.
4. Pick branch **main**, folder **/ (root)**, then **Save**.
5. Wait ~1 minute. Your site is live at **`https://your-username.github.io`** 🎉

---

## 🔁 Making changes later

After the first push, the loop is:

1. Edit files in VS Code.
2. Save.
3. In the terminal, run:
   ```bash
   git add .
   git commit -m "Describe what you changed"
   git push
   ```
4. Wait a minute. Live site updates automatically.

VS Code also has a built-in **Source Control** panel (the branch icon in the sidebar) where you can do all of this with buttons instead of typing — totally fine to use that.

---

## 🎨 Quick customization tips

- **Change the color scheme:** edit the `:root` variables at the top of `style.css`. Try `--accent: #2c5fc0;` (blue) or `--accent: #6b4e8a;` (purple) for a different mood.
- **Add a real photo:** replace the `<div class="portrait">…</div>` in `index.html` with `<img src="photo.jpg" class="portrait" alt="Me" />`. Drop the photo file into this folder.
- **Add a new section:** copy any existing `<section>...</section>` block, change the content, and update the nav link.
- **Different fonts:** browse https://fonts.google.com, copy the `<link>` tag from there into the `<head>` of `index.html`, then update `--serif` or `--sans` in `style.css`.

---

## Stuck?

- **Live site shows old content:** GitHub Pages caches aggressively. Hard-refresh with Cmd/Ctrl + Shift + R, or wait a couple minutes.
- **Git asks for a password and rejects it:** GitHub no longer accepts your account password from the terminal. You'll need a **personal access token** — see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens.
- **Page is broken after editing:** undo recent changes (Cmd/Ctrl + Z) until it works, then re-do them one at a time to find the culprit.

Have fun. Make it weird and yours.
