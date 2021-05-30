const express = require('express');
const api = require('./api');
const { join } = require('path')
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')

const server = express();
// server.set('view engine', 'ejs');
// server.set('views', join(__dirname, 'public', 'views'));
nunjucks.configure(join(__dirname, 'public', 'views'), {
    autoescape: false,
    express: server,
    // watch: true
})

server.locals = {
    messages: [
        {
            id: 1,
            text: "Lorem Ipsum",
            sender: "Valik",
            addedAt: Date.now()
        },
        {
            id: 2,
            text: "Dolor est",
            sender: "Dima",
            addedAt: Date.now()
        }
    ],
    isUserLogged: false
}

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
// server.use('/', express.static( join(__dirname, 'public', 'views') ))

server.get('/*', (req, res) => {
    // res.redirect('/')
    
    let messagesToRender = req.app.locals.messages;
    if(req.signedCookies.login){
        messagesToRender = messagesToRender.filter(mess => mess.sender === req.signedCookies.login)
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