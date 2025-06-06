# ClothifyStore - Next.js Fullstack eCommerce

## 🚀 Deployment (Vercel)

1. **Clone the repository**
2. **Copy `.env.example` to `.env.local` and fill in your credentials:**
   - Firebase (Firestore, Auth)
   - Cloudinary (media uploads)
   - Razorpay (payments)
   - EmailJS (optional, for order confirmation)
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run locally:**
   ```bash
   npm run dev
   ```
5. **Deploy to Vercel:**
   - Push your code to GitHub
   - Import the repo in [Vercel](https://vercel.com/import)
   - Add all environment variables from `.env.example` to Vercel dashboard
   - Deploy!

## 🧩 Required Environment Variables
See `.env.example` for all required keys.

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`
- `NEXT_PUBLIC_CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `NEXT_PUBLIC_RAZORPAY_KEY_SECRET`
- `NEXT_PUBLIC_EMAILJS_USER_ID` (optional)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` (optional)
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` (optional)

`
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
NEXT_PUBLIC_RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# EmailJS (optional)
NEXT_PUBLIC_EMAILJS_USER_ID=your_emailjs_user_id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
`
## 🛠️ Features
- Next.js 14+ App Router, SSR/CSR
- Firebase Auth & Firestore
- Cloudinary media uploads
- Razorpay payments
- EmailJS/Firebase Functions for emails
- Admin dashboard, role-based access
- SEO, accessibility, performance optimized

---

**Ready to deploy! Just add your env vars and go.**

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
#   c l o t h i f y S t o r e 
 
 