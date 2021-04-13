const { appendFile, writeFile } = require('fs/promises');
const shortid = require('shortid');

exports.getSorting = (req, res, next) => {
    if ( req.method === "GET" && req.path === '/' ){
        const sort = req.query.sort || 'addedAt'
        const sortValue = req.query.sortValue || 'desc'
        const limit = req.query.limit || 10
        const skip = req.query.skip || 0
        const messages = req.app.locals.messages;
        
        res.body = '';

        function compareValues(key, order) {
            return (a, b) => {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    // property doesn't exist on either object
                    return 0;
                }
            
                const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
                const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
            
                let comparison = 0;
                if (varA > varB) {
                    comparison = 1;
                } else if (varA < varB) {
                    comparison = -1;
                }
                return order === 'desc' ? (comparison * -1) : comparison
                
            };
        }

        const sortedMessages = messages.sort(compareValues(sort, sortValue))
        
        for (let i = 0; i < sortedMessages.length; i++) {
            if(skip === 0){
                if(limit < 51){
                    if(i < limit){
                        res.body += `${sortedMessages[i].addedAt} | ${sortedMessages[i].sender}: ${sortedMessages[i].text} \n`
                    }
                } else {
                    res.body += 'Limit value is too big'
                    break;
                }
            } else {
                if(skip < 501){
                    if(i > skip - 1){
                        if(i < limit){
                            res.body += `${sortedMessages[i].addedAt} | ${sortedMessages[i].sender}: ${sortedMessages[i].text} \n`
                        } else {
                            res.body += 'Limit value is too big'
                            break;
                        }
                    } else {
                        break;
                    }
                    
                } else {
                    res.body += 'Skip value is too big'
                    break;
                }
            } 
        }
        
        next()
    } else {
        next()
    }
}

exports.customLog = async (req, res, next) => {
    let startTime = new Date();
    let endTime = '';
    let formatedDataToLog = '';
    
    formatedDataToLog += `Start at ${startTime}\n`;
    endTime = new Date();
    formatedDataToLog += `Ended at ${endTime}\n`;
    formatedDataToLog += `Time It Took: ${endTime - startTime} ms\n\n`

    await appendFile('./currentLogFile.log', formatedDataToLog, (err) => {
        if(err) console.log(err);
    })
    
    next()
}

exports.postRequestHandler = (req, res, next) => {
    if ( req.method === "POST" && req.headers["content-type"] === "application/json" ){
        
        req.body.id = shortid.generate();
        req.body.sender = req.get('User-Agent');
        req.body.addedAt = Date.now();
        
        next();
    } else {
        next();
    }
}

exports.mainLog = (req, res, next) => {
    
    let formatedDataForMain = `Total requests: `;
    
    res.on('finish', function() {
        req.app.locals.requests.push(req);
        formatedDataForMain += `${req.app.locals.requests.length}\n`;
        req.app.locals.requests.forEach((request) => {
            formatedDataForMain += `Status - ${res.statusCode} | ${request.get('User-Agent')}\n`;
        })
    })

    setInterval( async() => {
        await writeFile('./mainLogFile.log', formatedDataForMain, (err) => {
            if(err) console.log(err);
        })
    }, 60000);

    next()
}