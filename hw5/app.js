const express = require('express');
const PORT = process.env.PORT || 3000;
const server = express()
const { join } = require('path');
const shortid = require('shortid');
const { appendFile, writeFile } = require('fs/promises');

const { customLog, postRequestHandler, getSorting, mainLog } = require('./middlewares');

server.locals = {
    messages: [
        {
            id: shortid.generate(),
            text: "akwfklwaj wkadjlwkajd awdkja lw",
            sender: "User Agent 1",
            addedAt: 1617984921603
        },
        {
            id: shortid.generate(),
            text: "bwakdjlawkjfkawjowaipowapo wadwa",
            sender: "User Agent 2",
            addedAt: 1617984921703
        },
        {
            id: shortid.generate(),
            text: "clgje kjwapfowj waoj opawj ",
            sender: "User Agent 3",
            addedAt: 1617984921903
        }
    ],
    requests: []
}


server.use("/assets", express.static(join(__dirname, "assets")));
server.use(express.json());
server.use('/', customLog);
server.use('/', postRequestHandler);
server.use('/', getSorting);
server.use('*', mainLog);

server.get('/', (req, res) => {
    res.write(res.body);
    res.end()
})

server.post('/', (req, res) => {
    req.app.locals.messages.push(req.body)
    res.end()
})

server.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something broke!");
});

server.listen(PORT, () => {
    console.log(`http:localhost:${PORT}`);
})