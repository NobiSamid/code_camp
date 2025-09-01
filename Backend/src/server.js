import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import { connect } from 'mongoose';
import cors from 'cors';
import path from 'path';

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//database connection ekhane na kore app run hobar age korba
// connectDB();

//middleware
if(process.env.NODE_ENV !== "production"){
app.use(
    cors(
      {origin:'http://localhost:5173'} // frontend er url diye dibo(jehetu cors er problem ashtese
  ))
}

app.use(express.json());
app.use(rateLimiter);

// simple custom middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} request kora hoise er jonno => ${req.url}`);
//   next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") { 
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('data base age connect hoye ekhon Server run korche ze port:', PORT);
  });
}).catch((error) => {
  console.error('database connect korte fail korse', error);
});

