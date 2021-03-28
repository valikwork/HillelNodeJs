const http = require('http');
const { createReadStream } = require('fs');
const { join } = require('path');

const server = http.createServer()
const PORT = process.env.PORT || 3000;

server.on('request', async (req, res) => {
    rs = createReadStream( join(__dirname, 'templates', 'index.html') );

    rs.pipe(res)
    // for await (let chunk of rs){
    //     res.write(chunk)
    // }
    // res.end()
})

server.listen(PORT, () => {
    console.log(`http:localhost:${PORT}`);
})