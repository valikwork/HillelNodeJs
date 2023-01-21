const express = require('express');
const mongoose = require('mongoose');
const { join } = require('path')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')
const api = require('./api');
const MessagesModel = require("./api/messages/model")

const server = express();

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

const secret = process.env.COOKIE_SECRET || getRandomString(40)

server.use(express.json())
server.use(cookieParser(secret))
server.use('/api', api)
server.use('/assets', express.static( join(__dirname, 'public', 'assets') ))

nunjucks.configure(join(__dirname, 'public', 'views'), {
    autoescape: false,
    express: server,
    // watch: true
})

mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('error', (err) => {
    console.error('connection error:', err);
    process.exit(1)
});
db.once('open', function() {
  console.log('MongoDB connected');
});
mongoose.set('debug', true)
mongoose.set('useCreateIndex', true)


server.get('/*', async (req, res) => {
    // res.redirect('/')
    
    let messagesToRender = await MessagesModel.find({}).lean().exec();
    if(req.signedCookies.login){
        messagesToRender = messagesToRender.filter(mess => mess.user === req.signedCookies.login)
    }
    
    res.render('index.nunjucks', {
        messages: messagesToRender,
        isUserLogged: req.signedCookies.login ? req.signedCookies.login : req.app.locals.isUserLogged,
        date: new Date().toISOString(),
      }
    )
})

server.listen(3000, () => {
    console.log("http://localhost:3000");
})