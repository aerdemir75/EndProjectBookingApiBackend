# Bookings API Final Project

This is the final project for the Back-End Development module at Winc Academy.

It is a RESTful API for a fictional booking platform. The app is built with **Node.js**, **Express**, **SQLite**, and **Prisma ORM**. It includes full CRUD functionality working with Postman, filtering, authentication, error tracking, and automated tests.

---

## etting Started

### Installation

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET_KEY=your_secret_key_here
SENTRY_DSN=your_sentry_dsn_here
```

> 💡 Tip: You can use any random string as your `AUTH_SECRET_KEY`.  
> If you're not using Sentry, you can leave `SENTRY_DSN` empty.

4. Run the database migration and seed:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

5. Start the app:

```bash
npm run dev
```

---

## Features

- ✅ JWT-based Authentication
- ✅ CRUD endpoints for Users, Hosts, Properties, Bookings, Amenities, and Reviews
- ✅ Filtering with query parameters (e.g. `/users?username=jdoe`, `/properties?location=Malibu&pricePerNight=310.25&amenities=Washer`)
- ✅ Inputvalidatie met Zod voor foutafhandeling bij onjuiste payloads
- ✅ Relational data fetching with Prisma `include`
- ✅ Global error handling with custom messages
- ✅ Error logging with Sentry
- ✅ Seed data provided via `prisma/seed.js`

---

## Running Tests

This project uses Newman to automate Postman tests.

### To run tests:

1. Start the server first:

```bash
npm run dev
```

2. Ensure your Postman environment file is pointing to the correct URL (`http://localhost:3000`)

3. Then run:

```bash
# For positive tests:
npm run test-positive

# For negative tests:
npm run test-negative
```

This runs the collections in the `/postman` folder using the environments in `/postman/environments`.

⚠️ Tests will delete data (e.g. DELETE requests), so it's important to restart your server afterward to reset the state.

- use the command npx prisma migrate reset to reset the database

- Also do not forget to re-seed the database using this command: NPX PRISMA DB SEED

---

## Using Prisma Studio (optional)

To browse and inspect your database visually during development, you can use [Prisma Studio](https://www.prisma.io/studio):

```bash
npx prisma studio
```

It opens an interactive UI in your browser, allowing you to view and edit all your tables.

> Note: Only use Prisma Studio in development. It directly changes your database content.

---

## Tech Stack

- Node.js
- Express
- Prisma ORM (with SQLite)
- JSON Web Token (JWT)
- Zod (voor inputvalidatie)
- Sentry (for error tracking)
- Postman & Newman (for testing)

---

## Author

Final project submitted by **Arif Erdemir** for Winc Academy – Back-End Development Track.
