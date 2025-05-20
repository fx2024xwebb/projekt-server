/* 
    Projektuppgift: Server-inställningar 
*/

// Inställningar
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Anslut MongoDb
mongoose.connect("mongodb://127.0.0.1:27017/products").then(() => {
    console.log("Connected to MongoDb");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
})

// Routing
app.get("/projektserver", async (req, res) => {
    res.json({ message: "API status OK!"});
})

// Starta
app.listen(port, () => {
    console.log("Server is running at port: " + port);
})