const express = require('express');
const app = express();
const dotenv = require("dotenv")
const connectDb = require("./db/connect")
const cors = require("cors");
const cookieParser = require("cookie-parser");


const accountRouter = require('./routes/account');
const profileRouter = require('./routes/profile');
const searchRouter = require("./routes/search")
const createRouter = require("./routes/create");
const homeRouter = require("./routes/home");
const reelRouter = require("./routes/reel");

dotenv.config();
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());



app.use("/api/social/account", accountRouter);
app.use("/api/social/profile", profileRouter);
app.use("/api/social/search", searchRouter);
app.use("/api/social/create", createRouter);
app.use("/api/social/home", homeRouter);
app.use("/api/social/reel", reelRouter);


const startServer = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();