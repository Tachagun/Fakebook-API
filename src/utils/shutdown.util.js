import prisma from "../config/prisma.config.js";

export default async function (signal) {
  console.log(`\nReceived ${signal}, Shutting down...`);
  try {
    console.log("\nPrisma Disconnected...");
    await prisma.$disconnect();
  } catch (err) {
    console.error("Error during disconnection", err);
  } 
  finally {
    // process.exit(0);
  }
}
