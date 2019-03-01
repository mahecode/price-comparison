const express = require('express');
const router = express.Router();

const productScraper = require('../app');

router.get('/', (req,res)=>{
    res.json({'hello': 'welcome'});
})

router.post('/data',(req,res)=>{
    //some logic
    const query = req.body.data;
    const priceCompared = new Promise((resolve,reject)=>{
        productScraper
            .pc(query)
            .then(data =>{
                resolve(data);
            })
            .catch(e=>{
                reject(e);
            })
    })
    Promise.all([priceCompared])
        .then(data=>{
            res.json(data);
        })
        .catch(e=>{
            console.log(e);
            res.status(500).send();
        })
})

module.exports = router;