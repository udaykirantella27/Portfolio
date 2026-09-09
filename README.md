# Uday Kiran Tella - Personal Portfolio

A modern, professional portfolio website built with Next.js 14, TypeScript, and CSS Modules.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **CSS Modules** for scoped styling
- **Responsive Design** for all devices
- **SEO Optimized** with proper metadata
- **Accessibility** compliant with ARIA labels and keyboard navigation
- **Performance Focused** with optimized loading

## 📋 Pages

- **Home** (`/`) - Hero section with introduction and call-to-action
- **About** (`/about`) - Professional summary and background
- **Skills** (`/skills`) - Technical skills organized by category
- **Projects** (`/projects`) - Portfolio of key projects
- **Project Detail** (`/projects/[slug]`) - Detailed case studies
- **Resume** (`/resume`) - Downloadable resume and experience summary
- **Contact** (`/contact`) - Contact form with validation

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Deployment:** Vercel

## 🏃‍♂️ Getting Started

1. **Prerequisites**
   - Node.js 20.9.0 or higher
   - npm or yarn

2. **Installation**
   ```bash
   npm install
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Lint**
   ```bash
   npm run lint
   ```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navbar/footer
│   ├── page.tsx           # Home page
│   ├── about/
│   ├── skills/
│   ├── projects/
│   │   └── [slug]/
│   ├── resume/
│   └── contact/
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   └── SkillBadge.tsx
└── data/                  # Static data
    ├── skills.ts
    ├── projects.ts
    └── experience.ts
```

## 🎨 Design Principles

- **Clean & Modern:** Minimalist design with focus on content
- **Professional:** Suitable for job applications and client presentations
- **Accessible:** WCAG compliant with proper semantic HTML
- **Responsive:** Mobile-first approach with fluid layouts
- **Performant:** Optimized images, lazy loading, and efficient code

## 📱 Responsive Design

The portfolio is fully responsive and works seamlessly across:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔍 SEO & Performance

- Static generation for optimal performance
- Proper meta tags and Open Graph data
- Semantic HTML structure
- Optimized images and fonts
- Fast loading times

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## 📄 License

This project is private and intended for personal use.

## 👤 Contact

**Uday Kiran Tella**
- Location: Bengaluru, India
- Email: [your-email@example.com]
- LinkedIn: [linkedin.com/in/uday-kiran-tella]
- GitHub: [github.com/uday-kiran-tella]
