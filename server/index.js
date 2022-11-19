const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

try {
    mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected to DB")
    );
} catch (e) {
    console.log("Could not connect to DB");
}

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on PORT ${process.env.PORT}`);
})