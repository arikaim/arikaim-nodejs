'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/


module.exports = class Routes {

    constructor(app) {
        this.createSystemRoutes(app);
    }

    createSystemRoutes(app) {
        // login
        app.put('/api/service/login/',function(req,res) {
           
        });
        // logout
        app.get('/api/logout/',function(req,res) {
           
        });
        // connect
        app.put('/api/connect/',function(req,res) {
           
        });
        // execute service
        app.put('/api/service/execute/',function(req,res) {
            
        });
    }   
}
