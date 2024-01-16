/**
 * Instance of the PrismaClient for database access.
 * The PrismaClient is used to interact with the database using the Prisma ORM.
 * 
 * @constant {PrismaClient} prisma - An instance of the PrismaClient.
 */

import { PrismaClient } from "@prisma/client";

// Access the global object for PrismaClient
const globalForPrisma = global;

// Initialize a new instance of the PrismaClient or use the existing one from the global context
const prisma = globalForPrisma.prisma || new PrismaClient();

// Store the PrismaClient instance in the global context if not in production
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
