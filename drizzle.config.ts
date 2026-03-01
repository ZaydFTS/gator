import { defineConfig } from "drizzle-kit";
import { readConfig } from "./src/core/config";

const config = readConfig();
const dbUrl = config.dbUrl;

export default defineConfig({
    schema: "src/core/schema.ts",
    out: "src/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: dbUrl,
    },
});