const express = require("express");
const app = express();

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
