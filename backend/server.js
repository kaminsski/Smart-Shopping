const express = require("express")
const mongoose = require("mongoose")
const dot = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");


const app = express()
const port = 5001

const mainRouter = require('./routes/index.js');

dot.config()

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log("bağlandı")
    } catch (error) {
         console.log(error)
    }
}
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))

app.use(express.json())
app.use(cookieParser())
app.use("/api", mainRouter)

app.listen(port, () =>{
connect()
console.log(`Sunucu ${port} çalışıya`)
})
