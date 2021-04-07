const { createServer } = require('http');
const { getAssets, getMessages, addMessage, updateMessage, deleteMessage } = require('./controller');

const FileType = require('file-type');
const PORT = process.env.PORT || 3000;

const server = createServer( async (req, res) => {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    
    const startTime = Date.now()
    res.once('finish', () => {
        const endTime = Date.now()
        console.log(res.statusCode, "Time spend:", endTime - startTime, 'ms', "User Agent:", req.headers["user-agent"]);
    })

    req.pathname = pathname;
    
    if(req.pathname === '/'){
        res.statusCode = 302;
        res.setHeader("Location", "/assets/index.html")
        return res.end()
    } else if(req.pathname.startsWith('/assets')){
        return getAssets(req, res)
    } else if(req.pathname.startsWith('/messages')){
        if(req.method === "GET" && req.pathname === "/messages"){
            return getMessages(req, res)
        } else if(req.method === "POST"){
            return addMessage(req, res)
        } else if(req.method === "PUT"){
            return updateMessage(req, res)
        } else if(req.method === "DELETE"){
            return deleteMessage(req, res)
        }
        
    }
    res.statusCode = 404;
    res.write("Page Not Found")
    res.end()
    
})

// server.on('request', async (req, res) => {

//     // res.once('close', () => {
//     //     console.log(`Request closed: method ${req.method} | on url ${req.url}`);
//     // })
    
//     const { pathname, searchParams } = new URL(req.url, 'http://localhost')
    
//     res.setHeader('Content-Type', 'text/plain');

//     if(req.method === 'GET'){
//         if(pathname === 'favicon.ico'){
//             res.destroy()
//         } else if(('index.html').includes(pathname) || pathname === '/' ){
//             let fileData = await readFile(join(__dirname, 'templates', 'index.html'), {encoding: 'utf-8'})
            
//             searchParams.forEach((paramValue, paramKey) => {
//                 fileData = fileData.replace( new RegExp(`{{.*?${paramKey}.*?}}`), paramValue)
//             })
            
//             res.setHeader('Content-Type', 'text/html');
//             res.end(fileData)
//         } else if(new RegExp("^/assets/").test(pathname)){
//             const filePath = join(__dirname, pathname);
//             const fileExist = existsSync(filePath)
            
//             if(fileExist){

//                 if(extname(filePath).includes('css')){
//                     res.setHeader('Content-Type', 'text/css');
//                 } else if(extname(filePath).includes('js')){
//                     res.setHeader('Content-Type', 'text/javascript');
//                 } else {
//                     const type = await FileType.fromFile(filePath)
//                     if(type && type.mime){
//                         res.setHeader('Content-Type', type.mime);
//                     }
//                 }

//                 rs = createReadStream( filePath );

//                 let fileBuffer = []
//                 let send = false
//                 const handleChunk = async (chunk) => {
//                     rs.pause()
//                     fileBuffer.push(chunk)
//                     const buffer = Buffer.concat(fileBuffer);
//                     if(buffer.length >= 4100){
//                         rs.removeListener('data', handleChunk)
//                         try {
//                             const type = await FileType.fromBuffer(buffer)
//                             if(type.mime){
//                                 res.setHeader('Content-Type', type.mime)
//                             }
//                             res.write(buffer)
//                             send = true
//                         } catch (e) {
//                             console.error(e);
//                         }
//                         rs.pipe(res)
//                     }
//                     rs.resume()
//                 }
//                 rs.on('data', handleChunk)
//                 rs.on('end', () => {
//                     if(!send){
//                         res.end(Buffer.concat(fileBuffer))
//                     }
//                 })
                
//             } else {
//                 res.end('404 Not Found')
//             }
//         } else {
//             res.end('404 Not Found')
//         }
//     } else if(req.method === 'POST') {
//         let str = '';
//         for await(const chunk of req) {
//             str += chunk
//         }

//         if(req.headers['content-type'] === 'application/json'){
//             str = JSON.parse(str)
//         } else if(req.headers['content-type'] === 'x-www-form-urlencoded'){
//             str = parse(str)
//         }

//         console.log('User Sent:', str);
//         res.end('ended')
        
//     } else {
//         res.end('404 Not Found')
//     }
// })

server.listen(PORT, () => {
    console.log(`http:localhost:${PORT}`);
})