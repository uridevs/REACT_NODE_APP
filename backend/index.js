import express from "express";
import mysql from "mysql";
import 'dotenv/config';


const port = process.env.PORT;
const db_user = process.env.DB_USER
const db_pwd = process.env.DB_PASSWORD

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:db_user,
    password:db_pwd,
    database: "test"
})

app.get("/", (req, res) => {
  res.json("Hello this is backend view")
}
)

app.use(express.json())


app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully!");
    })
})

app.listen(port, ()=>{
    console.log("Conected to backend");
})

