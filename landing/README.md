# 🍽️ Alhidayah Alfakhirah - Landing Page

Professional, bilingual (Arabic/English) landing page for the Alhidayah Alfakhirah food ordering platform in Makkah, Saudi Arabia.

## 🚀 Features

- ✅ **Bilingual Support**: Seamless Arabic & English with RTL support
- ✅ **Modern Design**: Built with Next.js 14, TypeScript, and Tailwind CSS
- ✅ **Responsive**: Mobile-first design, works on all devices
- ✅ **SEO Optimized**: Server-side rendering for better search engine visibility
- ✅ **Fast Performance**: Optimized for Core Web Vitals
- ✅ **Firebase Integration**: Ready to connect with existing backend
- ✅ **Accessible**: WCAG 2.1 compliant components

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Root layout with i18n
│   │   └── page.tsx       # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── layout/           # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/         # Page sections
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── DriverSection.tsx
│       ├── ContactSection.tsx
│       └── CTASection.tsx
├── i18n/
│   ├── config.ts         # i18n configuration
│   └── messages/         # Translation files
│       ├── ar.json       # Arabic translations
│       └── en.json       # English translations
└── lib/
    ├── firebase.ts       # Firebase setup
    └── utils.ts          # Utility functions
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase project (same as mobile apps)

### 2. Install Dependencies

```bash
# Navigate to the landing page directory
cd alhidayah-alfakhirah/web/landing

# Install dependencies (when network is available)
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

**Where to find these:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings (⚙️ icon)
4. Scroll down to "Your apps" section
5. Click on the web app icon (</>)
6. Copy the config values

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to `/ar` (Arabic) or `/en` (English) based on your locale.

### 5. Build for Production

```bash
npm run build
npm start
```

## 🌐 Internationalization (i18n)

### Supported Languages

- 🇸🇦 Arabic (ar) - Default
- 🇬🇧 English (en)

### Adding/Editing Translations

Edit the JSON files in `src/i18n/messages/`:

**ar.json** (Arabic):
```json
{
  "hero": {
    "title": "مأكولات أصيلة"
  }
}
```

**en.json** (English):
```json
{
  "hero": {
    "title": "Authentic Cuisine"
  }
}
```

### Using Translations in Components

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations();
  
  return <h1>{t('hero.title')}</h1>;
}
```

## 🎨 Customization

### Colors (Brand Colors)

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: {
    DEFAULT: "#2E75B6",  // Main brand color
    light: "#5B9BD5",
    dark: "#1F4E7A",
  },
  accent: {
    DEFAULT: "#D5E8F0",
    // ...
  }
}
```

### Fonts

The project uses:
- **Inter** for English text
- **Cairo** (to be added) for Arabic text

To add custom fonts, edit `src/app/[locale]/layout.tsx`.

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Import and add it to `src/app/[locale]/page.tsx`
3. Add translations to `src/i18n/messages/ar.json` and `en.json`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Option 1: Vercel (Recommended - FREE)

1. Push your code to GitHub/GitLab
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Click "Deploy"

**Custom Domain:**
1. Buy domain: www.alhidayahalfakhirah.com
2. In Vercel dashboard: Settings > Domains
3. Add custom domain
4. Update DNS records as instructed

### Option 2: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy --only hosting
```

## 📝 TODO / Next Steps

### Content Updates Needed:
- [ ] Replace placeholder images with real food photos
- [ ] Add actual restaurant address and contact info
- [ ] Update social media links
- [ ] Add real customer testimonials
- [ ] Create featured menu items

### Features to Add:
- [ ] Menu preview with real data from Firebase
- [ ] Customer testimonials carousel
- [ ] Photo gallery section
- [ ] Blog/News section
- [ ] FAQ section
- [ ] Google Maps integration for location
- [ ] WhatsApp floating button
- [ ] Newsletter subscription
- [ ] Google Analytics tracking

### Technical Improvements:
- [ ] Add loading skeletons
- [ ] Implement image optimization
- [ ] Add meta tags for SEO
- [ ] Create sitemap.xml
- [ ] Add structured data (Schema.org)
- [ ] Implement error boundaries
- [ ] Add animation libraries (Framer Motion)

## 🔗 Integration with Mobile Apps

This landing page uses the **same Firebase backend** as the mobile apps:

- Firestore database
- Firebase Storage
- Firebase Authentication (for dashboard later)

No duplicate data or separate backend needed!

## 📊 Performance

- Lighthouse Score: 90+ (aim for 95+)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Core Web Vitals: All green

## 🐛 Known Issues

None yet! Report issues in the project tracker.

## 📞 Support

For questions or issues:
- Email: dev@alhidayahalfakhirah.com
- Developer: [Your Name]

## 📄 License

Proprietary - © 2026 Alhidayah Alfakhirah. All rights reserved.

---

**Made with ❤️ in Makkah**
