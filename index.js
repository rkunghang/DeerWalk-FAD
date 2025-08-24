require ("dotenv").config();
const express = require("express");
const path = require ("path");
const connectDB = require ("./config/db");
const userRouter = require ("./routes/userRouter");

connectDB();


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use ("/users", userRouter);

app.listen(PORT, ()=> {
    console.log(`server is running at port ${PORT}`);
})

app.use("/users", userRouter);



