
const file = require('fs');

const System = include('core/system/system.js');


class Config
{
    constructor()
    {
        this.config = {};
        this.load('config.json');
    }

    load(file_name)
    {
        var config_file_name = Config.getConfigPath() + file_name;
        file.readFile(config_file_name, 'utf8',(err, data) => {
         
            this.config = JSON.parse(data);
        });
    }

    static getConfigPath()
    {
        return System.getBasePath();
    }
}

module.exports = Config;