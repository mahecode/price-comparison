const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const cors = require('cors');
const routes = require('./routes/index');

//middlewares
const port = process.env.PORT || 4000;



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/',routes);
//API


if(process.env.NODE_ENV === 'production') {
    //static folder 
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});