'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import Strategy from 'passport-strategy';
import Utils from './../utils/utils.js';
import cookie from 'cookie';
import e from 'express';


export default class PHPSessionStrategy extends Strategy {

    #options = {};
   
    constructor(options, userModel) {      
        super();
        this.name = 'php-session';
        this.#options = options;   
        this.userModel = userModel;  
    }

    /**
     * Authenticate.
     * @param {Object} req HTTP request object.
     * @api protected
     */
    async authenticate(req, options, callback) {       
        var sessionId = null;
        var sessionId = options['sessionId'] ?? req.cookies.PHPSESSID;              
        var user = this.authUser(sessionId);

        if (user == false) {
            return this.fail("Access denied",401);
        }

        try {
            return this.success(user,options);
        } catch (error) {
            return this.error(error);
        }
    }

    async authenticateSocket(socket) {
        var cookieData = cookie.parse(socket.handshake.headers.cookie);
        var sessionId = cookieData.PHPSESSID ?? null;
    
        console.log(sessionId);

        try {
            return await this.authUser(sessionId);           
        } catch (error) {  
            console.log(error);          
            return false;
        }
    }

    async authUser(sessionId) {
        if (isEmpty(sessionId) == true) {           
            return false;
        }
        // read php session data
        var data = await Utils.readPHPSession(sessionId,'/var/lib/php/sessions');
        var userId = data['auth.id'] ?? null;
        
        console.log(userId);

        if (isEmpty(userId) == false) {           
            return await this.userModel.findById(userId);           
        } else {
          
            return false;
        }                   
    }

    get options() {
        return this.#options;
    }
}
