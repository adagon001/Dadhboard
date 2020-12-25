const express = require('express')
const axios = require('axios');
var path = require('path');
const app = express()
const PORT =  3000;
var partials = require('express-partials');

// Static Files
app.use(express.static('public'))

// Set Templating Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/screen/resort/:resort', async (req, res, next) => {
    try {
       const apiData = await axios.get('http://test.data.gopass.travel/api/mobile/home/resorts/'+req.params.resort);
       const apiNewsData = await axios.get('http://test.data.gopass.travel/api/mobile/news/resorts/'+req.params.resort);
       //pass apiData to index.ejs to take care of it
       //console.log(apiData.data.result);
       res.render('index',{ apiData: apiData.data.result, apiNewsData: apiNewsData.data});
    }
    catch (e){
       //render error.ejs
       console.log(e); 
    }
});

app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`); //listening on PORT
  });