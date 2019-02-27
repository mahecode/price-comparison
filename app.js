const puppeteer = require('puppeteer');

const flipkart = require('./flipkart/flipkart');
const paytm  = require('./paytm/paytm');
const amazon = require('./amazon/amazon');

const pc = async (Query)=>{
    try {
        let priceCompared = {};
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 926 });
        // flipkart method

            await page.goto(flipkart(Query)); //enter product here
            console.log('flipkart');
            if (await page.$('div._1UoZlX[data-tkid]') !== null){
                let fproduct = await page.evaluate(() => {
                    let fproducts = [];
                    prom = document.querySelectorAll('div._1UoZlX[data-tkid]');
                    for (i = 0; i < 4; i++) {
                        let proJson = {};
                        let element = prom[i];
                        try {
                            proJson.name = element.querySelector('div._3wU53n').innerText;
                            proJson.price = element.querySelector('div._1vC4OE').innerText;
                            imgSelector = element.querySelector('div._3BTv9X img');
                            proJson.imgSrc = imgSelector.getAttribute('src');
                            linkSelector = element.querySelector('div._1UoZlX a');
                            proJson.link = 'https://www.flipkart.com'+linkSelector.getAttribute('href');
                        } catch (exception) {
                            console.log(exception);
                        }
                        fproducts.push(proJson);
                    }
                    return fproducts
                })
                priceCompared['flipkart'] = fproduct;
                
            }
            else{
                let fproduct = await page.evaluate(() => {
                    let fproducts = [];
                    prom = document.querySelectorAll('div._3liAhj[data-tkid]');
                    for (i = 0; i < 4; i++) {
                        let proJson = {};
                        let element = prom[i];
                        try {
                            proJson.name = element.querySelector('a._2cLu-l').innerText;
                            proJson.price = element.querySelector('div._1vC4OE').innerText;
                            imgSelector = element.querySelector('div._3BTv9X img');
                            proJson.imgSrc = imgSelector.getAttribute('src');
                            linkSelector = element.querySelector('div._3liAhj a');
                            proJson.link = 'https://www.flipkart.com'+linkSelector.getAttribute('href');
                         } catch (exception) {
            
                        }
                        fproducts.push(proJson);
                    }
                    return fproducts
                })
                priceCompared['flipkart'] = fproduct;
            }

        // //paytm method
        
        await page.goto(paytm(Query));
        console.log('paytm');
        let pproduct = await page.evaluate(() => {
            let pproducts = [];
            container = document.querySelectorAll('div._2i1r');
            for (i = 0; i < 4; i++) {
                let proJson = {}
                element = container[i];
                try {
                    proJson.name = element.querySelector('div._2apC').innerText;
                    proJson.price = element.querySelector('div._1kMS').innerText;
                    proJson.cashback = element.querySelector('div._27VV').innerText;
                    imgSelector = element.querySelector('div._3nWP img');
                    proJson.imgSrc = imgSelector.getAttribute('src');
                    linkSelector = element.querySelector('div._3WhJ a');
                    proJson.link = 'https://paytmmall.com'+linkSelector.getAttribute('href');
                    
                } catch (exception) {
                    console.log(exception);
                }
                pproducts.push(proJson);
            }
            return pproducts
        });
        priceCompared['paytm'] = pproduct;
        await browser.close();
        return priceCompared;
    } catch (error) {
        console.log(error);
    }    
};


module.exports.pc = pc;