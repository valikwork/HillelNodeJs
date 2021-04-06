const { createReadStream, existsSync, promises:{ readFile, stat }, createWriteStream } = require('fs');
const { join, extname } = require('path');
const { parse } = require('querystring');

const messages = [
    {
        date: new Date(),
        text: "new message",
        from: "user1",
        id: Math.random()
    }
]

exports.getAssets = async (req, res) => {
    
    const fileName = join(__dirname, req.pathname)

    const rs = createReadStream(fileName)
    rs.pipe(res)
    // res.end('lalala')
}

exports.getMessages = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify(messages))
    res.end()
}

exports.addMessage = async (req, res) => {
    let body = '';
    for await (const chunk of req) {
        body += chunk;
    }
    body = JSON.parse(body)
    console.log(body);
    body.id = messages.length + 1; 
    messages.push( body )
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify(messages))
    res.end()
}

exports.updateMessage = (req, res) => {
    const body = req.body
    const pathID = req.pathname.exec(/{messages\/\d}/)
    const message = messages.find(e => e.id === pathID)
    Object.assign(message, body)
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify(messages))
    res.end()
}

exports.deleteMessage = (req, res) => {
    const pathID = req.pathname.exec(/{messages\/\d}/)
    const messageIndex = messages.findIndex(e => e.id === pathID)
    messages.splice(messageIndex, 1)
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify(messages))
    res.end()
}