const express = require('express');
const router = express.Router();
const fs = require("fs");


const products = ["public blog post 1"];


router.get("/", (req, res) => {
    let ind = fs.readFileSync(__dirname + "/../public/index.html")
    
    const s = products.reduce((a, c) => {
        return `${a}<li>${c}</li>`
    }, "")
    ind = ind.toString().replace("<!-- LIST -->", s);
    // res.setHeader("Content-Security-Policy", "script-src 'self'")
    res.send(ind);
})

router.get("/products", (req, res) => {
   res.send(products)
})

 
router.post("/products", (req, res) => {
    // NOTE: need sanitization here.
    products.push(req.body.name);
    res.send({"success":true})
})

router.get ("/js", (req, res )=> {
  res.sendFile(__dirname + "/src.js")
});

router.use('/hacker_server', require('../hacker_server'));

module.exports = router;