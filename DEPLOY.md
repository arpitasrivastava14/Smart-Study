# 🚀 Deployment Guide — Smart Study

This guide walks you through deploying the **Smart Study** full-stack application.

---

## 📁 Project Structure

| Folder | Tech Stack | Purpose |
|--------|-----------|---------|
| `frontend/` | React + Vite | User interface |
| `backend/` | Node.js + Express | REST API |

---

## 1️⃣ Push Code to GitHub

Your repository is already connected to:
```
https://github.com/adrsy6394/Smart-Study.git
```

To push the latest code:
```bash
git add .
git commit -m "setup: GitHub Pages deployment config"
git push origin main
```

---

## 2️⃣ Deploy Frontend to GitHub Pages (FREE)

GitHub Pages hosts your React frontend for free.

### Step A: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/adrsy6394/Smart-Study`
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment** → **Source**, select **GitHub Actions**
4. The workflow file `.github/workflows/deploy-frontend.yml` is already included in this repo

### Step B: Set Backend API URL (Secret)
1. In your GitHub repo, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `VITE_API_URL`
4. Value: Your deployed backend URL + `/api`  
   Example: `https://smart-study-api.onrender.com/api`
5. Click **Add secret**

### Step C: Trigger Deployment
- Push any change to the `main` branch, or
- Go to **Actions** tab → Select **Deploy Frontend to GitHub Pages** → Click **Run workflow**

### Step D: Access Your Site
- After the workflow completes (check the **Actions** tab), your site will be live at:
  ```
  https://adrsy6394.github.io/Smart-Study/
  ```

---

## 3️⃣ Deploy Backend to Render (FREE)

GitHub Pages only hosts static files. Your Node.js backend needs a separate server.

### Step A: Create a Render Account
1. Go to [render.com](https://render.com) and sign up (free)
2. Click **New +** → **Web Service**

### Step B: Connect Your Repo
1. Select **Build and deploy from a Git repository**
2. Connect your GitHub account and choose `adrsy6394/Smart-Study`

### Step C: Configure the Service
| Setting | Value |
|---------|-------|
| **Name** | `smart-study-api` (or any name) |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |

### Step D: Add Environment Variables
In Render, go to **Environment** and add:

| Key | Value | Description |
|-----|-------|-------------|
| `MONGO_URI` | `your_mongodb_connection_string` | Your MongoDB Atlas cluster URL |
| `JWT_SECRET` | `your_super_secret_key` | Any random string for JWT signing |
| `CLIENT_URL` | `https://adrsy6394.github.io` | Your frontend URL (for CORS) |
| `NODE_ENV` | `production` | Production mode |
| `PORT` | `10000` | Render assigns this automatically, but you can leave it |

> 💡 **Get MongoDB URI**: If you don't have one, create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).

### Step E: Deploy
Click **Create Web Service**. Render will build and deploy your backend.

Once live, copy the service URL (e.g., `https://smart-study-api.onrender.com`) and add `/api` to it when setting the `VITE_API_URL` secret in GitHub.

---

## 4️⃣ Alternative: Deploy Frontend on Vercel (Better for React Router)

If you experience routing issues on GitHub Pages (e.g., refreshing a page returns 404), **Vercel** is a better choice for React SPAs.

### Steps:
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **Add New Project** → Import `Smart-Study`
3. Set **Framework Preset** to `Vite`
4. Set **Root Directory** to `frontend`
5. Add environment variable: `VITE_API_URL` = your Render backend URL + `/api`
6. Click **Deploy**

> ✅ Vercel handles React Router out of the box, and the `vercel.json` in this repo is already configured for SPA routing.

---

## 5️⃣ Alternative: Deploy Everything on Railway

If you prefer a single platform, [Railway](https://railway.app) can host both frontend and backend.

1. Connect your GitHub repo
2. Deploy the `backend` folder as a web service
3. Deploy the `frontend` folder as a static site
4. Set environment variables for both

---

## 🔗 Quick Reference URLs

| Service | URL Pattern |
|---------|-------------|
| GitHub Pages (Frontend) | `https://adrsy6394.github.io/Smart-Study/` |
| Render (Backend) | `https://smart-study-api.onrender.com` |
| Vercel (Frontend alt) | `https://smart-study.vercel.app` |

---

## ⚠️ Important Notes

- **CORS**: The backend `server.js` already allows `CLIENT_URL` via environment variables. Make sure `CLIENT_URL` matches your actual frontend domain.
- **Cookies**: `withCredentials: true` is enabled. For cookies to work cross-domain, your backend must use `credentials: true` in CORS (already configured).
- **MongoDB**: If `MONGO_URI` is not set, the backend will skip the DB connection and run in mock mode.

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| GitHub Pages shows blank page | Check browser console for 404 errors on assets. Ensure `base` in `vite.config.js` matches your repo name. |
| API calls fail with CORS error | Verify `CLIENT_URL` in backend env vars matches your frontend URL exactly. |
| React Router pages 404 on refresh | This is a GitHub Pages limitation. Switch to **Vercel** for better SPA support, or use HashRouter instead of BrowserRouter. |
| Build fails in GitHub Actions | Check the **Actions** tab for logs. Ensure `VITE_API_URL` secret is set. |

---

## ✅ Deployment Checklist

- [ ] Backend deployed on Render (or Railway)
- [ ] `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` set in backend env vars
- [ ] Frontend repo secret `VITE_API_URL` set in GitHub
- [ ] GitHub Pages enabled with GitHub Actions source
- [ ] Workflow completed successfully (green checkmark in Actions tab)
- [ ] Frontend loads at `https://adrsy6394.github.io/Smart-Study/`
- [ ] Login/register API calls succeed

---

Happy deploying! 🎉

