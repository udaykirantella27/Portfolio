# Production Deployment Guide

This portfolio is engineered with Next.js 16, React 19, TypeScript, and modern web performance optimizations. It is 100% production-ready with zero type errors, clean ESLint validation, automated SEO generators, security headers, and CI/CD pipelines.

---

## 1. Automated CI/CD Pipeline (GitHub Actions)

A GitHub Actions workflow is pre-configured at [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

Every time you push code to `main` or `master`, or open a Pull Request, GitHub Actions will automatically:
1. Checkout your code on a clean Ubuntu runner.
2. Setup Node.js 20.x with npm dependency caching.
3. Install exact production dependencies (`npm ci`).
4. Run ESLint code quality check (`npm run lint`).
5. Run TypeScript static type check (`npx tsc --noEmit`).
6. Execute the Next.js production build (`npm run build`).

---

## 2. Deploying to Vercel (Recommended - 2 Minutes)

Vercel is the creators of Next.js and provides the fastest, zero-configuration global edge deployment:

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: production ready portfolio with magazine case studies"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** → **"Project"**.
4. Select your portfolio repository from the list.
5. Vercel will auto-detect Next.js. Leave the default build command (`npm run build`) and output directory.
6. Click **"Deploy"**.
7. In ~60 seconds, your site will be live worldwide with SSL and custom domain support!

---

## 3. Deploying to AWS Amplify

1. Open the [AWS Management Console](https://console.aws.amazon.com/amplify).
2. Click **"New App"** → **"Host web app"**.
3. Select **GitHub** and authorize AWS Amplify to access your repository.
4. Select the `main` branch.
5. Amplify will auto-detect the Next.js framework.
6. Save and deploy. Amplify will automatically build and deploy the portfolio.

---

## 4. Pre-Deployment Verification Checklist

- [x] **TypeScript Check**: `npx tsc --noEmit` passes with 0 errors.
- [x] **ESLint Validation**: `npm run lint` passes with 0 errors.
- [x] **Resume Delivery**: Verified `public/Uday_Kiran_Tella_Resume_MSD.pdf` and `public/resume.pdf` serve valid 200 OK responses with `application/pdf` headers.
- [x] **SEO Sitemap**: Dynamic sitemap generated at `/sitemap.xml` indexing all pages and 5 project case studies.
- [x] **SEO Robots**: Crawler rules generated at `/robots.txt`.
- [x] **Security Headers**: HSTS, nosniff, frame protection, referrer policy, and permissions policy active in `next.config.ts`.
- [x] **Error Handling**: Custom 404 page (`src/app/not-found.tsx`) and client-side error boundary (`src/app/error.tsx`).
- [x] **Mobile Responsiveness**: Fluid layout verified down to 320px screen widths.

