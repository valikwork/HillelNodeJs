const express = require('express');
const { join } = require('path')

const server = express();

server.use(express.json())

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
    ]
}

server.listen(3000, () => {
    console.log("http://localhost:3000");
})