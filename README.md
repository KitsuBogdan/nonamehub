# NoNameHub

Resource hub for Roblox Studio developers — scripts, models, UI kits.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Cloudflare Worker** для генерації ключів
- **Linkvertise** для монетизації завантажень

## Local setup

```bash
npm install
cp .env.example .env.local   # заповнити змінні
npm run dev
```

Відкрити [http://localhost:3000](http://localhost:3000).

## Environment variables

| Змінна | Опис | Де взяти |
|---|---|---|
| `NONAME_WORKER_URL` | URL Cloudflare Worker | Cloudflare Dashboard → Workers |
| `NONAME_ADMIN_TOKEN` | Bearer-токен для воркера | Worker Settings → Variables |
| `NONAME_TOKEN_SECRET` | Секрет для підпису одноразових токенів | Згенерувати: `openssl rand -hex 24` |
| `NEXT_PUBLIC_SITE_URL` | Публічний URL сайту | Домен, куди задеплоєно |

## Deploy (Vercel)

1. Запуште репозиторій на GitHub.
2. Vercel → **Import Project** → виберіть репо.
3. У **Settings → Environment Variables** додайте всі 4 змінні.
4. Deploy.

## Deploy (Cloudflare Pages)

1. Cloudflare Dashboard → **Workers & Pages** → **Create**.
2. Під'єднайте GitHub-репо.
3. Build command: `npm run build`
4. Output directory: `.next` (для `@cloudflare/next-on-pages`) або `.vercel/output/static`
5. Додайте env-змінні.

## Scripts

```bash
npm run dev      # dev-сервер
npm run build    # прод-збірка
npm run start    # запуск прод-збірки
npm run lint     # ESLint
```