import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
import app from './app';

// Ensure PORT is a number
const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("MongoDB connection succeeded");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`The server is running successfully on port: ${PORT}`);
    });
  })
  .catch(err => {  // use the same name here
    console.error("ERROR on connection MongoDB:", err);
    process.exit(1); // stop the server
  });
