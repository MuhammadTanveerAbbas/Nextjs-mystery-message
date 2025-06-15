# Mystery Message

**A Next.js–powered messaging platform** leveraging modern best practices for authentication, real-time data, and AI-assisted messaging.

---

## 🚀 Key Features

- **Next.js 15** with App Router and API Routes
- **NextAuth.js** for secure, extensible authentication
- **MongoDB (Mongoose)** for scalable data persistence
- **Resend & custom email templates** for verification flows
- **TypeScript & Zod** for end-to-end type safety and schema validation
- **Tailwind CSS & Radix UI** for performant, accessible UI components

---

## ⚙️ Prerequisites

- Node.js ≥ 18.x
- npm (or Yarn / pnpm / Bun)
- MongoDB connection URI
- Resend API key (for email delivery)
- OpenAI API key (for AI-assisted messaging)

---

## 🔧 Setup & Development

1. **Clone & install**

   ```bash
   git clone https://github.com/MuhammadTanveerAbbas/Nextjs-mystery-message.git
   cd Nextjs-mystery-message
   npm install
   ```

2. **Configure environment**
   Copy `.env.example` to `.env` and fill in:

   ```env
   MONGODB_URI=your_mongo_uri
   NEXTAUTH_SECRET=your_nextauth_secret
   RESEND_API_KEY=your_resend_key
   OPENAI_API_KEY=your_openai_key
   ```

3. **Run locally**

   ```bash
   npm run dev
   # visit http://localhost:3000
   ```

4. **Build & start**

   ```bash
   npm run build
   npm start
   ```

---

## 📋 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Compile for production   |
| `npm start`     | Launch production build  |
| `npm run lint`  | Run ESLint checks        |

---

## 📂 Project Structure

```
├── app/           # Next.js App Router & pages
├── components/    # Reusable UI components
├── lib/           # Database & utility libs
├── schemas/       # Zod validation schemas
├── api/           # Serverless API routes
└── public/        # Static assets
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/…`)
3. Commit with clear messages
4. Open a PR against `main`

---

## 📜 License

Distributed under the MIT License.
