const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const productScraper = require('./app');
//middlewares
const port = process.env.PORT || 4000;

if(process.env.NODE_ENV === 'production') {
    //static folder 
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//API



app.get('/',(req,res)=>{
    res.json({'name': 'Welcome to scraping'});
})

app.post('/data',(req,res)=>{
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

app.listen(port, ()=>{
    console.log('Server running on port 4000')
});