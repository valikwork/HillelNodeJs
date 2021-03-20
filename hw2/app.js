const os = require('os');
const { INIT, FIND, COMPLETE, PROGRESS, ERROR } = require('./constants');

const Finder = require('./Finder');

const dirToSearch = __dirname //os.homedir();
const depth = 0;
const fileToFind = new RegExp(/\.json$/);

const MyDataFinder = new Finder(dirToSearch, depth, fileToFind);

MyDataFinder.once(INIT, () => {
    MyDataFinder.parse()
});

MyDataFinder.on(FIND, (path) => {
    console.log('Found:', path);
})

MyDataFinder.on(PROGRESS, (handler) => {
    console.log('progress:', handler);
})

MyDataFinder.once(COMPLETE, (foundData) => {
  console.log('complete found data', foundData);  
})

MyDataFinder.once(ERROR, (err) => {
    console.log(err);
    process.exit(1)
})