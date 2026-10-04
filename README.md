# Math AI 🎓 — Matematika va Geometriyani AI bilan o'rganish platformasi

9-, 10- va 11-sinf maktab o'quvchilari uchun mo'ljallangan, sun'iy intellekt (Gemini 3.8 Flash) bilan boyitilgan zamonaviy matematika va geometriya ta'lim platformasi.

![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?style=flat-square&logo=prisma)
![Google Gemini](https://img.shields.io/badge/Gemini_3.8_Flash-AI-8E75B2?style=flat-square&logo=google)

---

## 🌟 Asosiy imkoniyatlar

- 📚 **11 bosqichli pedagogik dars tizimi:**
  - Mavzuga kirish va hayotiy amaliy misollar
  - Asosiy tushunchalar va sodda tilda izohlangan ta'riflar
  - KaTeX matematik formulalari va har bir belgining izohi
  - Parabola, intervallar va sonlar o'qi uchun yuqori aniqlikdagi **vektor SVG chizmalari**
  - Qadam-baqadam yechish algoritmlari
  - Oson, o'rta va murakkab darajadagi bosqichma-bosqich yechilgan namunaviy misollar
  - ⚠️ Ko'p uchraydigan xatolar va 💡 eslab qolish uchun layfxaklar
- 🎯 **Dars ichida interaktiv mini-tekshiruv (Mini Quiz):**
  - O'quvchi javobni tanlab, shu zahotiyoq to'g'ri/xatoligini va KaTeX dagi to'liq yechimni ko'radi.
- 🤖 **Dars ichida AI Ustoz (Gemini 3.8 Flash):**
  - Dars kontekstiga moslashgan holda tushunmagan savollarga o'quvchi darajasida sodda javob beradi.
- 🚀 **AI Practice & Xatolar tahlili (Mistake Analysis):**
  - Mavzuga oid mustaqil testlar, qadam-baqadam xatolarni tahlil qilish va bilim statistikasi.
- 🔍 **Tezkor va xavfsiz qidiruv (Search Bar):**
  - Mavzular va darslarni bir vaqtda qidirish, dars sahifalariga to'g'ridan-to'g'ri o'tish.
- 🌙 **To'liq Dark/Light mavzu** va moslashuvchan (responsive) zamonaviy dizayn.

---

## 🛠 Texnologiyalar steki

- **Frontend:** Next.js (App Router, Turbopack), React 19, Tailwind CSS v4, Lucide Icons, Shadcn UI
- **Matematik vizualizatsiya:** KaTeX, React-Markdown, Remark-GFM, SVG vektor grafikasi
- **Backend & API:** Next.js Server Components, Server Actions, Route Handlers
- **Ma'lumotlar bazasi:** PostgreSQL (Neon Serverless), Prisma ORM
- **Autentifikatsiya:** NextAuth.js v5 (Google OAuth & Credentials)
- **Sun'iy intellekt:** Google Gemini API (`gemini-3.8-flash`)

---

## 🚀 O'rnatish va ishga tushirish

### 1. Repozitoriyni klonlash:
```bash
git clone https://github.com/saidaxmad7/math-ai.git
cd math-ai
```

### 2. Bog'liqliklarni o'rnatish:
```bash
npm install
```

### 3. Muhit o'zgaruvchilarini sozlash:
`.env.example` faylidan nusxa olib, `.env` faylini yarating va kerakli kalitlarni kiriting:
```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Ma'lumotlar bazasini sozlash va dasturni to'ldirish:
```bash
npx prisma db push
npx tsx prisma/populate-curriculum.ts
```

### 5. Dasturni ishga tushirish:
```bash
npm run dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) manzilini oching.

---

## 📄 Litsenziya
MIT License.
