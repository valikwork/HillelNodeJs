module.exports = Object.assign({
    PORT: parseInt(process.env.PORT || '3000'),
    saltRounds: 6
    
}, require(`./${process.env.NODE_ENV}.config.js`));