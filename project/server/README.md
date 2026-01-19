# SAVR Auth Server

Express + MySQL backend for signup and login against the `SAVR` database.

## Setup

1. Copy `env.example` to `.env` and fill DB credentials and `JWT_SECRET`.
2. Install deps: `npm install`
3. Create table: `mysql -u <user> -p < project/server/db/schema.sql`
4. Run dev server: `npm run dev` (or `npm start`).

Server listens on `PORT` (default 4000).

## API

- `POST /api/auth/signup` `{ email, password, name }` → `{ user, token }`
- `POST /api/auth/login` `{ email, password }` → `{ user, token }`

Responses are JSON; errors include `message`.






