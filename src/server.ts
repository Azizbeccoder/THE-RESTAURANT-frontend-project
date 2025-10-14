import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

// ✅ Use the correct env key
mongoose.connect(process.env.MONGODB_URL as string, {})
.then((data) =>{
   console.log("MongoDB connection succeed");
   const PORT = process.env.PORT ?? 3003;
})
.catch(err => console.log("ERROR on connection Mongo Db",err));

