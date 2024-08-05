const express = require("express");
const cors = require("cors");
const { taskRouter } = require("./routes/taskRoutes");
const { connection } = require("./config/db");
const { clientRouter } = require("./routes/clientRoutes");
const { ticketRouter } = require("./routes/ticketRoutes");
const { projectRouter } = require("./routes/projectRoutes");
require("dotenv").config();


const app = express();
app.use(cors())
app.use(express.json());

app.use("/tasks",taskRouter)
app.use("/clients", clientRouter)
app.use("/tickets",ticketRouter)
app.use("/projects",projectRouter)

app.get("/",async(req,res)=>{
    res.send("hello")
})




app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to mongodb")
        console.log(`Server is running at 8080`)
    } catch (error) {
        console.log("Error connecting to db")
    }
})