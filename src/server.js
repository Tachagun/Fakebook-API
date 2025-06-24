import dotenv from "dotenv";
import app from "./app.js";
import shutdown from "./utils/shutdown.util.js";

dotenv.config();
// console.log(process.env.PORT)

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", () => shutdown("uncaughtException"));
process.on("unhandledRejection", () => shutdown("unhandledRejection"));




