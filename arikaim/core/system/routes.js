'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/
const System = include('core/system/system.js');


class Routes {

    constructor(app) {
        this.createSystemRoutes(app);
    }

    createSystemRoutes(app) {
        // login
        app.post('/api/login/',function(req,res) {
            System.log('login');
            res.send('login');
        });
        // logout
        app.get('/api/logout/',function(req,res) {
            System.log('logout');
            res.send('logout');
        });
        // connect
        app.post('/api/connect/',function(req,res) {
            console.log('logout');
            res.send('logout');
        });
    }
}

module.exports = Routes;