const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const $ = require('cheerio');

const productScraper = require('../app');
let url = "https://www.amazon.in/s?k=";


router.post('/data',(req,res)=>{
    //some logic
    let query = req.body.data;
    let Queryurl = url + query + '&ref=nb_sb_noss';
    console.log(Queryurl);
    let amazonData = rp(Queryurl).then(html => {
        let x = -2;
        console.log("Amazon");
        let innerData = [0,1,2,3].map(element => {
            return {
                name: $('.a-size-medium.a-color-base.a-text-normal', html)[element].children[0].data,
                price: $('.a-price-whole', html)[x = x + 2].children[0].data,
                imageSrc : $('.a-section.aok-relative.s-image-fixed-height', html).children()[element].attribs['src'],
                link: Queryurl
            };
        });
        return innerData;
    }).catch(e => {
        console.log(e);
    });
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
   
    Promise.all([priceCompared,amazonData])
        .then(data=>{
            res.json(data);
        })
        .catch(e=>{
            console.log(e);
            res.status(500).send();
        })
})

module.exports = router;