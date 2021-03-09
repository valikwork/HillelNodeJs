const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const os = require('os');
const ip = require('ip');

const argv = yargs(hideBin(process.argv)).argv

let res = {}
if(argv.cpu){
    res.cpu = os.arch();
}
if(argv.lan){
    res.lan = ip.address()
}
if(argv.ram){
    res.ram = os.totalmem()
}
if(argv.fullInfo){
    res.cpu = os.arch();
    res.lan = ip.address();
    res.ram = os.totalmem();
}
if(argv.osName){
    res.osName = os.hostname()
}

module.exports = res 