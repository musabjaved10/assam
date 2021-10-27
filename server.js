const express = require("express");
const app = express();
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/db_sm_mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db_mongo = mongoose.connection;
db_mongo.on("error", console.error.bind(console, 'MongoDB connection error:'));
db_mongo.once("open", () => {
    console.log("MongoDB connected successfully")
});

const db = require('./database/mySQL')

const PORT = 3000

app.get('/',async (req,res)=>{
    const sql = "SELECT * FROM admin_user"
    try {
        await db.query(sql, (err, result) => {
            if (err) {
                return res.send('Something wrong with query')
            }
            res.send(result)
        })

    } catch (e) {
        res.send('error')
    }
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
} )
