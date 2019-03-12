const puppeteer = require('puppeteer');

const flipkart = require('./flipkart/flipkart');
const paytm  = require('./paytm/paytm');

const pc = async (Query)=>{
    try {
        let priceCompared = {};
        const browser = await puppeteer.launch({
            'args' : [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });

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
            container = document.querySelectorAll('div._3WhJ');
            let paytmData = [0,1,2,3].map( element => {
                return {
                    name: container[element].querySelector('div._2apC').innerText,
                    price: container[element].querySelector('div._1kMS').innerText,
                    cashback: container[element].querySelector('div._27VV') !== null ? container[element].querySelector('div._27VV').innerText: null ,
                    imgSrc: container[element].querySelector('._3nWP img').getAttribute('src'),
                    link: 'https://paytmmall.com' + container[element].querySelector('._3WhJ a').getAttribute('href')
                }
            })
            return paytmData;
        });
        priceCompared['paytm'] = pproduct;
        await browser.close();
        return priceCompared;
    } catch (error) {
        console.log(error);
    }    
};


module.exports.pc = pc;