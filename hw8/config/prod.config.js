module.exports = {
    mongodb: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/prod',
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    saltRounds: 10
};