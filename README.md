# Scalable REST API Assignment

## Stack
- Node.js, Express, Prisma (Postgres)
- React (Vite)
- JWT auth, bcrypt, Joi validation
- Docker + docker-compose

## Setup (dev)
1. Copy `.env` files for backend/frontend
2. Run `docker-compose up --build`
3. Backend: http://localhost:4000
4. Frontend: http://localhost:5173
5. Swagger: http://localhost:4000/docs

## Scripts
- backend: `npm run dev`
- frontend: `npm run dev`

## Notes
- Use `prisma migrate dev` to create DB schema
- Create admin user manually (role=ADMIN) via DB or seed script

## Postman Collection
- [include exported collection file]
