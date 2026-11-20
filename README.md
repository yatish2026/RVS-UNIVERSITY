# RVS-UNIVERSITY

Official Web Portal for **RVS University** (Chittoor, Andhra Pradesh).

## 🏛️ About RVS University
Built on the bedrock of academic integrity, research curiosity, and industry alignment, RVS University equips students for leadership in a rapidly evolving world.

- **Founder Chairman**: Dr. Ravuri Venkataswamy
- **Vice Chairman**: Shri R.V. Srinivas, B.Tech., MBA (UK)
- **Principal**: Dr. Matam Mohan Babu, Ph.D.
- **Accreditations**: UGC & AP State Statutory University, NAAC A+, NBA Tier-1, AICTE & PCI Approved

---

## 🚀 Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Vanilla CSS animations
- **Icons**: Lucide React
- **Voice AI**: Integrated Dograh Voice AI Agent

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🧑‍💼 Recruitment (Careers) Module

- **Public form:** `https://rvsu.ac.in/#careers-apply` (not linked from the site menus yet).
- **Admin console:** private link `https://rvsu.ac.in/#hr-console/<secret-key>` — manage applications, edit the form
  (fields, steps, departments, designations, lists), notification emails, and download applications as PDF.
- **Code:** `src/features/recruitment/` (React) and `public/hr-api/` (PHP API).
- **Data:** stored outside the web root in `~/rvsu_hr_data` on the server (applications, uploads, form versions,
  `admin-key.sha256`). Locally it is `.hr-data/` (git-ignored).

### Local development
```bash
npm run dev                                   # http://localhost:3000
php -S 127.0.0.1:8090 -t public               # serves /hr-api (proxied by Vite)
```
Put `log` in `.hr-data/mail-mode.txt` to write emails to `.hr-data/outbox/` instead of sending them.

## 🚀 Deployment
Every push to `main` runs `.github/workflows/deploy-cpanel.yml`: it builds the site and rsyncs `dist/` to cPanel over SSH.
It never deletes files and never overwrites the server's root `.htaccess` or the other apps in `public_html/api`.
