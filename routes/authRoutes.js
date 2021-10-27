const express = require('express')
const router = express.Router()
const passport = require('../utils/strategy')



router.get('/login',(req,res)=>{
    res.send('login page')
})

router.get('/haha',(req,res)=>{
    res.send('haha')
})


router.post("/login", passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/haha',
        successFlash: true,
        failureFlash: true
    })
);

module.exports = router

