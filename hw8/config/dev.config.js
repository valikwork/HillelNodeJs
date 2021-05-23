module.exports = {
    mongodb: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/phonebook',
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
};