const express = require('express')
const router = express.Router()
const passport = require('../utils/strategy')



router.get('/login',(req,res)=>{
    res.send('login page')
})


router.post("/login", passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true
    })
);

module.exports = router

