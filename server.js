const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simulerad användardata
const mockUser = {
  username: "admin",
  password: "password123"
};

// Endpoint för inloggning
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    res.status(200).json({ message: "Inloggning lyckades!" });
  } else {
    res.status(401).json({ error: "Fel användarnamn eller lösenord!" });
  }
});

// Starta servern
app.listen(3000, () => {
  console.log("Servern körs på http://localhost:3000");
});