const express = require('express');
const { resolve } = require('path');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserModel = require("./Schema");
const bcrypt = require("bcrypt");

const app = express();
const port = 3010;
dotenv.config();

app.use(express.static('static'));
app.use(express.json()); // Middleware to parse JSON body

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post("/post", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    
    if (!userName || !email || !password) {
      return res.status(400).send("Please fill all the required fields");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Something went wrong");
  }
});

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Database Connection Error:", err);
});