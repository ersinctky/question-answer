const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandlers = require("./middlewares/errors/customErrorHandlers");
const routers = require("./routers/index");
const app = express();



// environment variables

dotenv.config({
    path:"./config/env/config.env"

})

// mongodb connection
connectDatabase();

const PORT = process.env.PORT;

// express - body middleware

app.use(express.json());

// routers middleware

app.use("/api",routers);

// error handler

app.use(customErrorHandlers);







app.listen(PORT,function(){

    console.log(`port working at localhost: ${PORT} : ${process.env.NODE_ENV}`);
})