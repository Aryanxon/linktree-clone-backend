const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./Model/User')


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://aryanbandooni19:lLkl0HmZ6bwMoXHj@cluster0.clhhy.mongodb.net/");  // mongodb://127.0.0.1:27017/Aryan_linktree


app.post("/Log_in", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json(user)
            }
            else{
                res.json("the password is incorrect")
            }
        }
        else{
            res.json("No record existed")
        }
    })
    .catch(err => res.json(err))
})

app.post('/Sign_up', (req, res) => {
    UserModel.create(req.body)
    .then(User => res.json(User))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running");
})