module.exports = {
    mongodb: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/phonebook',
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    },
    saltRounds: 10,
    jwtSecret: process.env.SECRET || 's3cr3t'
};