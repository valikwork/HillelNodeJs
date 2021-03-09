const { COLOR } = require('./env');
const chalk = require('chalk');
const log = console.log;

global.console.log = (...args) => {
    log(chalk[COLOR]("==="), chalk[COLOR](...args), chalk[COLOR]("==="))
}

global.console.short = (...args) => {
    if(args.length > 2){
        log(args[0], chalk[COLOR]("..."), args[args.length - 1])
    } else {
        log(...args)
    }
}
