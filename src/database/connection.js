import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export async function openServerDatabase() {
  const database = new MongoClient(process.env.MONGO_URI);

  try {
    await database.connect();
    console.log("Database conected!");
    return database.db("mywallet");
  } catch (err) {
    console.log(err);
  }
}
