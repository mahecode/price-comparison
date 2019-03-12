let aurl = 'http://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=';

const amazon = (query) => {
    aurl = aurl + query;
    return aurl;
}

module.exports = amazon;