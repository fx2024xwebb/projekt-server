/* 
    Projektuppgift: Server-inställningar 
*/

// Inställningar
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Anslut MongoDb
mongoose.connect("mongodb://127.0.0.1:27017/projektserver").then(() => {
    console.log("Connected to MongoDb");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
})

// Produkt "Schema"
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Namn på produkt måste anges."],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Pris för produkt måste anges."],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Beskrivning av produkt måste anges."],
    }
});

const Product = mongoose.model("Product", ProductSchema);


/* Routing */

// API
app.get("/projektserver", async (req, res) => {
    res.json({ message: "API status OK!"});
})

// GET: Hämta inlägg från databasen
app.get("/products", async (req, res) => {
    try {
        let result = await Product.find({});

        return res.json(result);

    } catch(error) {
        return res.status(500)
    }
});

// POST: Lägg till nytt inlägg i databasen
app.post("/products", async (req, res) => {
    try {
        let result = await Product.create(req.body);

        return res.json(result);

    } catch(error) {
        return res.status(400).json(error);
    }
});

// PUT: Uppdatera inlägg i databasen
app.put("/products/:id", async (req, res) => {
    
    try {
        let id = req.params.id;

        let name = req.body.name;
        let price = req.body.price;
        let description = req.body.description;

        let result = await Product.updateOne({_id: id}, {$set: { name, price, description }});
        return res.json(result);

    } catch(error) {
        return res.status(204).json(error);
    }
});

// DELETE: Radera inlägg i databasen
app.delete("/products/:id", async (req, res) => {

    try {
        let id = req.params.id;
        let result = await Product.deleteOne({_id: id});
        return res.json(result);

    } catch(error) {
        return res.status(204).json(error);
    }
});

// Admin login
app.post("/login", async (req, res) => {
    
    console.log("Login...");
    
    try {
        const { username, password } = req.body;

        // Validera input
        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input" });
        }
        
        // Hämta data från env-fil
        let adminAcc = process.env.ADMIN_ACCOUNT;
        let adminPass = process.env.ADMIN_PASSWORD;

        if(username != adminAcc) {
            return res.status(401).json({ error: "Incorrect username and/or password" });
        } 

        if(adminPass != adminPass) {
            return res.status(401).json({ error: "Incorrect username and/or password" });
        } else {

            // Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '10h'});
            const response = {
                message: "User logged in.",
                token: token
            }

            res.status(200).json({ response });
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Skyddad Admin-sida
app.get("/admin", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad Admin route" });
});

// Validera jwt-token för inloggning
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Kontroll, token finns?
    if(token == null) res.status(401).json({ message: "Authorization failed: Invalid/missing token."});
    // Kontroll, token giltig?
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({ message: "Invalid JWT."});

        req.username = username;
        next();
    });
}

// Starta
app.listen(port, () => {
    console.log("Server is running at port: " + port);
})