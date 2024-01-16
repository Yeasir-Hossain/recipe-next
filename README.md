# Recipe-Next Project Documentation

## Overview

**Recipe-Next** is a web application project designed for managing recipes. It provides CRUD (Create, Read, Update, Delete) operations on recipes, allowing users to add, view, update, and delete recipe entries. The backend of the project is implemented using Prisma ORM with SQLite as the database.

## Project Structure

The project is structured using the Next.js framework, offering server-side rendering and efficient React components.

### Start the development server

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Start the production server

```bash
npm start
```

### Seed the database with initial data

```bash
npm run seed
```

### Run Prisma migrations and open Prisma Studio

```bash
npm run prisma
```

## Project Workflow

### Install project dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

## Database Management

- Prisma is used as the ORM for database interactions.
- Migrations can be applied using `npm run prisma`.
- Prisma Studio can be accessed using `npm run prisma` for database exploration.

## CRUD Operations

- **Create**: Add new recipes using the provided form.
- **Read**: View the list of recipes with details.
- **Update**: Edit existing recipes using the update form.
- **Delete**: Remove unwanted recipes from the database.
