const chalk = require('chalk');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const log = console.log;

const argv = yargs(hideBin(process.argv)).argv
const COLOR = process.env.COLOR || 'magenta';
const PRIMARY = argv.primary || 'magenta';

global.console.log = (...args) => {
    log(chalk[PRIMARY]("==="), chalk[COLOR](...args), chalk[PRIMARY]("==="))
}

global.console.short = (...args) => {
    if(args.length > 2){
        log(args[0], chalk[COLOR]("..."), args[args.length - 1])
    } else {
        log(...args)
    }
}