const express = require('express')
const app = express()
const {db} = require('./config/db')
var jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
db.connect()
app.use(express.json())
app.use(express.urlencoded({extended: true})); 

const userRoutes = require('./routes/userRoutes');
// Mounting user routes
app.get('/',(req,res)=>{
    res.send("user created!")
})
app.get('/dashboard',(req,res)=>{
    res.send("Dashboard")
})
app.post("/token", (req,res) => {

    let token = req.body.token;


    try {
        jwt.verify(token, "lambofgod");
        res.send("OK");
    } catch (error) {
        res.status(500).send("Token EXPIRE!");
    }

    

})

app.use('/api/users', userRoutes);
app.listen(3000,()=>{
    console.log("Server is running ...");
})