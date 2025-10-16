const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amit@1234",
    database: "inquirey",

})

db.connect((err) => {
    if (err) {
        console.log("not connect", err)

    } else {
        console.log("connected")
    }
})
const sql = "INSERT INTO users (name,password) VALUES (?,?)";
app.post("/register", (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ err: "fill all fields " })
    }

    db.query(sql, [name, password], (err, result) => {
        if (err) {
            console.error("error in data inserting", err)

        } else {
            res.json({ message: "user registreted" })
           
        }
    })


})
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})