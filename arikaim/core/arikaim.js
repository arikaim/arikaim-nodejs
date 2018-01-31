const express = require('express');

class Arikaim  
{
   
    constructor()
    {
        this.express = express();
        this.port = 8080;
        this.dev_mode = true;
        this.version = '1.0';
        this.self = this;
    }
    
    log(msg) 
    {
        if (this.dev_mode == true) {
            console.log(msg);
        }
    }

    run()
    {
        console.log("Arikam Services version: " + this.version);

        this.express.listen(this.port,() => {
             console.log('Server started on port: ' + this.port);
        });
    }

    get(path,handler)
    {
        this.express.get(path, (request, response) => {
            handler(request,response);
        });
    }
    
}

module.exports = Arikaim;