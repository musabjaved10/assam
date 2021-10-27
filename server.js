const express = require("express");
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')


// mongoose.connect('mongodb://localhost:27017/db_sm_mongo', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// const db_mongo = mongoose.connection;
// db_mongo.on("error", console.error.bind(console, 'MongoDB connection error:'));
// db_mongo.once("open", () => {
//     console.log("MongoDB connected successfully")
// });

const db = require('./database/mySQL')

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));
// //Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require('./routes/authRoutes')
app.use("/", userRoutes)

app.get('/', (req,res)=>{

    try {
        res.send('root page')

    } catch (e) {
        res.send('error')
    }
})



const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
} )
