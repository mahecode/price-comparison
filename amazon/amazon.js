const rp = require('request-promise');
const $ = require('cheerio');

let amazonData = (query) => {
    rp(query).then(html => {
    console.log("Amazon");
    let innerData = [0,1,2,3].map(element => {
        return {
            name: $('h2', html)[element].attribs['data-attribute'],
            price: $('.a-size-base.a-color-price.s-price.a-text-bold',html).children()[element].next['data'] !== undefined ?  $('.a-size-base.a-color-price.s-price.a-text-bold',html).children()[element].next['data'] : null ,
            imageSrc : $('.s-access-image.cfMarker',html)[element].attribs['src'],
            link: $('.s-access-image.cfMarker',html)['0'].parent.attribs['href']
        };
    });
    return innerData;
    }).catch(e => {
        console.log(e);
    });
}

module.exports = amazonData;