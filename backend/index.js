import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

import leadRoutes from "./routes/leadRoutes.js";

dotenv.config({path: "./config/.env"});
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
  return res.send("Hello World");
});

app.listen(PORT, () => {
   console.log(`Server, is running on PORT ${PORT}`);
});