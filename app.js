import express from "express";
import userRouter from "./routes/user.js";


const app = express();


// Global middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true,}))


// Routing Middlewares
app.use("/api/v1", userRouter);


export default app;
