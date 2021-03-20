const { readdir } = require('fs/promises');
const { join, relative, sep } = require('path');
const { FIND, PROCESS, ERROR } = require('./constants');


const readDir = async (dirPath, depth, fileToFind, basePath, emitter) => {
    const foundResults = [];
    try{
        const dirContent = await readdir(dirPath, { withFileTypes: true })
        
        for( let item of dirContent ){
            if(item.isDirectory()){
                emitter(PROCESS, 'dir')
                const newDir = join(dirPath, item.name)
                const relativePath = relative(basePath, newDir);
                const hops = relativePath.split(sep);
                
                if(depth && hops.length > depth){
                    continue;
                };

                foundResults.push(...await readDir(newDir, depth, fileToFind, basePath, emitter))
            } else if(item.isFile()){
                emitter(PROCESS, 'file')
                if(fileToFind.test(item.name)){
                    foundResults.push(join(dirPath, item.name))
                    emitter(FIND, join(dirPath, item.name))
                }
            }
        }
    } catch(err) {
        emitter(ERROR, err)
    }

    return foundResults;
}


exports.readDir = readDir