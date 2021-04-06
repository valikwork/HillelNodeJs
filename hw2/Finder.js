const EventEmitter = require('events');
const { INIT, COMPLETE, PROGRESS, FIND, PROCESS } = require('./constants');
const { readDir } = require('./fsFinder');

const TIMER_DELAY = 3000;

class Finder extends EventEmitter {
    constructor(dirToSearch, depth, fileToFind) {
        super();

        this._dirToStartSearchIn = dirToSearch;
        this._depth = depth;
        this._fileToFind = fileToFind;
        this._processDirs = 0;
        this._processFiles = 0;

        this.on(FIND, () => {
          this.startTimer()
        })

        this.on(PROCESS, (type) => {
          switch (type) {
            case 'dir':
              this._processDirs = this._processDirs + 1;
              break;
            case 'file':
              this._processFiles = this._processFiles + 1;
              break;
            default:
              break;
          }
        })

        setTimeout(() => {
          this.emit(INIT)
        }, 0);
    }
    

    async parse() {
      console.log('parse started');
      this.startTimer()
      const foundData = await readDir(this._dirToStartSearchIn, this._depth, this._fileToFind, this._dirToStartSearchIn, this.emit.bind(this));
      this.clearTimer()
      this.emit(COMPLETE, {
        foundData,
        process: {
          dirs: this._processDirs, 
          files: this._processFiles
        }
      })
    }


    startTimer() {
      this.clearTimer();
      this._timer = setTimeout(() => {
        this.emit(PROGRESS, {dirs: this._processDirs, files: this._processFiles})
      }, TIMER_DELAY);
    }

    clearTimer(){
      clearTimeout(this._timer);
    }
}

module.exports = Finder;