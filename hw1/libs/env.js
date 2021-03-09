const chalk = require('chalk');
const COLOR = process.env.COLOR;

if(chalk[COLOR] === undefined) {
    console.log(chalk.red('Invalid color'));
    process.exit(1);
}

exports.COLOR = COLOR;