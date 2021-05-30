require('./checkEnv');
const express = require('express');
const mongoose = require('mongoose');
const { isCelebrateError } = require('celebrate');
const { PORT, mongodb } = require('./config');

mongoose.connect(mongodb.uri, mongodb.options)
mongoose.set('debug', process.env.NODE_ENV !== 'prod')

const app = express()

app.use(express.json())

app.use("/api", require("./api"))

app.use((err, req, res, next) => {
    if(isCelebrateError(err)){
        const [field, error] = err.details.entries().next().value;
        return res.status(406).json({ message: error.message, field })
    }
    let mongoCode;
    if(err.code > 550){
        mongoCode = err.code;
        err.code = 500;
    }
    res.status(err.code || 400).json({ message: err.message, ...(mongoCode ? {mongoCode} : "") })
})

app.get('/*', (req, res) => {
    res.send('lalala')
})

app.listen(PORT, () => {
    console.log(`Web app start at http://localhost:${PORT} ENV: ${process.env.NODE_ENV}`);
})