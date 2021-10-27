const express = require("express");
const app = express();
const mongoose = require('mongoose')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const ejsMate = require('ejs-mate')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')

const User = require('./models/userModel')
const Course = require('./models/courseModel')


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

//template setup for frontend
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true})); // To receive data from front-end
app.use(express.static(path.join(__dirname, 'public')))//Setting up static path to tell our app to search static files like css,images inside public folder
app.use(flash()) //Flash messages

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


let loggedIn = false //Initially, user is not logged in. So its false
// //Configure passport middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success'); //Green flash message
    res.locals.error = req.flash('error');     // Red flash message
    res.locals.currentUser = req.session.currentUser || 'User' // If a uer is logged-in. This wil contain username which we will use to show it on our Welcome Screen
    next();
});


app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',async (req,res)=>{
    const {email, password} = req.body
    const sql = `SELECT * FROM admin_tb where email= ?`


    try {
        await db.query(sql, email, async (err, result) => {
            if (err) {
                console.log('bhoo')
                console.log(err)
            }
            console.log(result)
            if (result.length === 0) {
                req.flash('error', `Invalid email`)
                return res.redirect(req.headers.referer)
            }
            const isEqual = await bcrypt.compareSync(password, result[0].password);
            if (!isEqual){
                req.flash('error', `Invalid Password`)
                console.log('Invalid password')
                return res.redirect(req.headers.referer)
            }
            loggedIn = true
            req.session.currentUser = result[0].username
            req.flash('success', 'Login successful')
            return res.redirect('/')
        })

    } catch (e) {
        console.log(e)
        console.log('catch error')
    }

})

app.get('/logout', (req, res) => {
    req.flash('success', 'Goodbye, See you again!')
    loggedIn = false
    res.redirect('/login')
})

app.get('/feed',async (req,res)=> {

    const courses = [
        {
            name:'history',
        },
        {
            name:'geography',
            courseType:'Optional'
        },
        {
            name:'Maths',

        },
        {
            name:'Computer Science',
            courseType:'Optional'
        },
        {
            name:'Chemistry',
        },
    ]



    try {

        const createdUsers = await Course.insertMany(courses)
        console.log('Data feed')
        process.exit()
    } catch (e) {
        console.error(`${e.message}`)
        process.exit(1)
    }
})
app.get('/data',async(req,res)=>{
    const sql = `INSERT into admin_tb set ?`

    try {
        const data = {
            username: 'admin2',
            first_name: 'Mark',
            last_name: 'Robert',
            email:'mark@admin.com',
            password: bcrypt.hashSync('password', 10)
        }
        await db.query(sql, data, (err, result) => {
            if (err) {
                console.log('bhoo')
                console.log(err)

            }
            res.send('query executed')
        })

    } catch (e) {
        console.log('catch error')
    }

})


app.get('/', (req,res)=>{
    res.render('login')
})



const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
} )
