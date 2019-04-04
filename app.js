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
                    prom = document.querySelectorAll('div._1UoZlX[data-tkid]');
                    let flipkartScrap = [0,1,2,3].map( element => {
                        return{
                            name : prom[element].querySelector('div._3wU53n').innerText,
                            price: prom[element].querySelector('div._1vC4OE').innerText,
                            imgSrc: prom[element].querySelector('div._3BTv9X img').getAttribute('src'),
                            link: prom[element].querySelector('div._1UoZlX a').getAttribute('href')
                        }
                    })
                    return flipkartScrap;
                })
                priceCompared['flipkart'] = fproduct;
                
            }
            else if(await page.$('div.IIdQZO._1R0K0g._1SSAGr[data-tkid]') !== null){
                let items = await page.evaluate(()=>{
                    item = document.querySelectorAll('div.IIdQZO._1R0K0g._1SSAGr[data-tkid]');
                    let flipkartScrap = [0,1,2,3].map( element => {
                        return {
                            name: item[element].querySelector('a._2mylT6').innerText,
                            price: item[element].querySelector('div._1vC4OE').innerText,
                            imgSrc: item[element].querySelector('div._3ZJShS img').getAttribute('src'),
                            link : 'https://www.flipkart.com' + item[element].querySelector('a._2mylT6').getAttribute('href')
                        }
                    })
                    return flipkartScrap
                })
                priceCompared['flipkart'] = items
            }
            else{
                let fproduct = await page.evaluate(() => {
                    prom = document.querySelectorAll('div._3liAhj[data-tkid]');
                    let flipkartScrap = [0,1,2,3].map( element =>{
                        return{
                            name: prom[element].querySelector('a._2cLu-l').innerText,
                            price:  prom[element].querySelector('div._1vC4OE').innerText,
                            imgSrc: prom[element].querySelector('div._3BTv9X img').getAttribute('src'),
                            link: 'https://www.flipkart.com'+ prom[element].querySelector('div._3liAhj a').getAttribute('href')
                        }
                    })
                    return flipkartScrap;
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