let aurl = 'https://www.amazon.in/s/?field-keywords=';

const amazon = (query) => {
    // query = query.split(' ');
    // query = query.join('%20');
    aurl = aurl + query;
    return aurl;
}

module.exports = amazon;