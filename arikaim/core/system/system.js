const path = require('path');

class System
{
    static getRootPath()
    {
        process.cwd()
    }

    static getBasePath()
    {
        System.getRootPath() + path.sep + 'arikaim' + path.sep;
    }
}

module.exports = System;

global.include = (name) => {
    var file_name = process.cwd() + path.sep + 'arikaim' + path.sep + name;
    return require(file_name);
   
}