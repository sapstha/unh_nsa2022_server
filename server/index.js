const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts'); 
app.use('/api/posts', posts);

app.use('/resume', require('./routes/api/posts'));
//Handle production
if(process.env.NODE_ENV==='production'){
    //static folder
    app.use(express.static(__dirname+'/public/'));

    app.get(/.*/,(req,res)=>res.sendFile(__dirname+'/public/index.html'));
}
const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server started on port ${port}`));