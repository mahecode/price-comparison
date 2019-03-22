const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const $ = require('cheerio');

const productScraper = require('../app');
let url = "http://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=";


router.post('/data',(req,res)=>{
    //some logic
    let query = req.body.data;
    let Queryurl = url + query;
    let amazonData = rp(Queryurl).then(html => {
        console.log("Amazon");
        let innerData = [0,1,2,3].map(element => {
            return {
                name: $('h2', html)[element].attribs['data-attribute'],
                price: $('.a-size-base.a-color-price.s-price.a-text-bold',html).children()[element].next['data'],
                imageSrc : $('.s-access-image.cfMarker',html)[element].attribs['src'],
                link: $('.s-access-image.cfMarker',html)['0'].parent.attribs['href']
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