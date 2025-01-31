const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mockUser = { username: "admin", password: "password123" };

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === mockUser.username && password === mockUser.password) {
        res.status(200).json({ message: "Inloggning lyckades!" });
    } else {
        res.status(401).json({ error: "Fel användarnamn eller lösenord!" });
    }
});

app.listen(3000, () => {
    console.log("Servern körs på http://localhost:3000");
});