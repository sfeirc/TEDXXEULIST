# TEDxEULiSTParis 2027 Website

Public site for **TEDx IMT × EULiST** (Paris, February 2027).

## 🎯 Overview

Official English-language site for TEDxEULiSTParis 2027, with a dark “nuclear” TEDx red theme. The event is at Théâtre Folies Bergère in February 2027.

### Design Philosophy
- **TEDx red** on deep black, with EULiST partnership callouts
- **Dark, high-contrast UI** with glass-style cards and subtle motion
- **English copy** across navigation and pages (proper nouns may keep French diacritics, e.g. Théâtre Folies Bergère)

## 🚀 Features

### Core Pages
- **Homepage**: Hero section with countdown timer, event details, and call-to-action buttons
- **About**: Project origin, mission, objectives, and TEDx license information
- **Team**: Organizing team with member profiles and recruitment information
- **Speakers**: Speaker announcement placeholder and application form
- **Practical Info**: Event schedule, venue location, transportation, and FAQ
- **Partners**: Institutional partners, sponsorship tiers, and partnership benefits
- **Contact**: Contact form, team emails, location, and social media links

### Technical Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ SEO optimized with meta tags and Open Graph
- ✅ Real-time countdown timer
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Accessibility features
- ✅ Fast loading with Next.js 15

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Headless UI

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development

The development server runs on `http://localhost:3000`

### Project Structure

```
tedx-eulist/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── team/
│   │   ├── speakers/
│   │   ├── practical-info/
│   │   ├── partners/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
├── public/
├── package.json
└── README.md
```

## 🎨 Design Philosophy

- **Modern & Professional**: Clean, contemporary design that reflects the TEDx brand
- **User-Centric**: Intuitive navigation and clear call-to-actions
- **Responsive**: Seamless experience across all devices
- **Accessible**: WCAG compliant with keyboard navigation support
- **Performance**: Optimized for fast loading and smooth interactions

## 📝 Content Management

### Updating Content

- **Team Members**: Edit `src/app/team/page.tsx`
- **Partners**: Edit `src/app/partners/page.tsx`
- **FAQ**: Edit `src/app/practical-info/page.tsx`
- **Event Date**: Update countdown in `src/app/page.tsx`

### Adding Speakers

When speakers are confirmed:
1. Replace the placeholder in `src/app/speakers/page.tsx`
2. Add speaker cards with photos, bios, and topics
3. Update the "Coming Soon" section

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### GitHub Pages

1. Configure `next.config.ts` with `output: 'export'` (already set) and `basePath` for GitHub Pages if needed
2. Run `npm run build`
3. Deploy the `out` directory

## 🔒 Environment Variables

Create a `.env.local` file for sensitive data:

```env
NEXT_PUBLIC_SITE_URL=https://tedxeulistparis.com
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
```

## 📊 Analytics

To add analytics:
1. Install your preferred analytics package (Google Analytics, Plausible, etc.)
2. Add the tracking code to `src/app/layout.tsx`

## 🤝 Contributing

This is a student-led project. If you're part of the organizing team:

1. Clone the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for TEDxEULiSTParis 2027, operating under a TEDx license.

## 📧 Contact

- **Speakers & talk proposals**: tedx.imt2026@gmail.com
- **Sponsorship & partnerships**: tedximtpartenaire@gmail.com

## 🎉 MVP Launch Checklist

- ✅ Homepage with countdown and CTAs
- ✅ About page with mission and objectives
- ✅ Team page with member profiles
- ✅ Speakers placeholder with application form
- ✅ Practical info with schedule and FAQ
- ✅ Partners page with sponsorship tiers
- ✅ Contact page with form
- ✅ Responsive design
- ✅ SEO optimization
- ⬜ Add real team photos (placeholder initials used)
- ⬜ Add partner logos
- ⬜ Configure form submission endpoint
- ⬜ Add Google Maps embed
- ✅ Favicon (`public/favicon.png`)
- ⬜ Set up domain
- ⬜ Configure analytics

---

Built with ❤️ by the TEDxEULiSTParis organizing team
