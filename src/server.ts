import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import app from './app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3005;

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in .env file");
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connection succeeded");

    app.listen(PORT, () => {
      console.log(`The server is running successfully on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("ERROR on connection MongoDB:", err);
    process.exit(1);
  });