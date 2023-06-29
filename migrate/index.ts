import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { migrate } from "drizzle-orm/planetscale-serverless/migrator";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

console.log(dotenv.config().parsed?.DATABASE_HOST);

const connection = connect({
    host: dotenv.config().parsed?.DATABASE_HOST,
    username: dotenv.config().parsed?.DATABASE_USERNAME,
    password: dotenv.config().parsed?.DATABASE_PASSWORD
})

const db = drizzle(connection);

await migrate(db, { migrationsFolder: "drizzle" });