## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 18
* PNPM ≥ 8
* Docker

### Install dependencies

```sh
pnpm install
```

### Start development environment

```sh
pnpm dev
```

This will:
* Start PostgreSQL & Redis via Docker
* Run DB schema generation & migrations
* Start api and worker services concurrently

> **Note:** CRUD operations are not yet implemented.  
> To quickly explore the [GraphQL API](http://localhost:4000/graphql), run the provided database seed script.

```sh
pnpm run dev:db:seed
```

## 🧩 Design Decisions

This monorepo is structured with maintainability, type safety, and developer productivity in mind. Key choices include:

- **Prisma** – Chosen as the ORM for its excellent **type safety**, intuitive API, and smooth migration workflow. Prisma’s schema-driven approach ensures consistency between the database and application code.
- **Redis + BullMQ** – Selected for the **asynchronous job queue** to handle background tasks efficiently (e.g., sending emails, processing data) with robust job scheduling and retry mechanisms.
- **Modular Packages** – The repository includes two shared packages:
  - **`db`** – Contains database schema, migrations, and seed scripts, making database logic reusable across all apps.
  - **`queue`** – Encapsulates job queue setup and configuration, so multiple services can easily enqueue and process jobs without duplicating logic.
- **GraphQL Yoga** – Used as the GraphQL server for its simplicity, flexibility, and strong developer experience.
- **dotenv-flow** – Handles environment variable management in the monorepo, enabling different `.env` files for development, testing, and production while supporting overrides.
- **Vitest** – Chosen as the testing framework for its fast, modern, and TypeScript-friendly testing experience.

This design keeps the codebase modular, encourages reuse, and ensures that both the API and worker services can evolve independently while sharing core infrastructure.

> **Disclaimer:** The `.env` and `.env.docker` files are committed to the repository. While this is generally discouraged for security reasons, they are included here to provide a quick start for development and testing — specifically so that running `docker compose up` (simulating a prod environment) will work out-of-the-box without additional configuration.

## 🔮 Future Improvements

Planned enhancements to improve maintainability, performance, and developer experience:

- Move GraphQL type generation into a shared package so that all applications can use the same generated types, ensuring consistency and reducing duplication.
- Optimize Docker builds by creating a base image that performs common monorepo setup steps, with each application (`api`, `worker`, etc.) inheriting from it to reduce build times and simplify Dockerfiles.
- Implement full CRUD operations in the API.
- Add end-to-end testing alongside the current unit test setup with Vitest.
- Introduce structured logging for better observability and debugging.
- Add monitoring and metrics collection for the API and worker services.

