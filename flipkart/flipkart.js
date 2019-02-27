const furl = 'https://www.flipkart.com/search?q=';
const furl1 = '&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&as-pos=0&as-type=HISTORY&as-backfill=on'


const flipkart = (query) => {
    url3 = furl + query + furl1;
    return url3;
}

module.exports = flipkart;