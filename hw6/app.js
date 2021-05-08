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

server.use(express.json())
server.use(cookieParser('ehxPMytbsunv'))
server.use('/api', api)
server.use('/assets', express.static( join(__dirname, 'public', 'assets') ))
// server.use('/', express.static( join(__dirname, 'public', 'views') ))

server.get('/*', (req, res) => {
    // res.redirect('/')
    
    res.render('index.nunjucks', {
        messages: req.app.locals.messages,
        isUserLogged: req.signedCookies.login ? req.signedCookies.login : req.app.locals.isUserLogged,
        date: new Date().toISOString(),
      }
    )
})

server.listen(3000, () => {
    console.log("http://localhost:3000");
})