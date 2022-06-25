'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import Strategy from 'passport-strategy';
import Utils from './../utils/utils.js';

export default class PHPSessionStrategy extends Strategy {

    #options = {};
   
    constructor(options, userModel) {      
        super();
        this.name = 'php-session';
        this.#options = options;   
        this.userModel = userModel;  
    }

    async authenticate(req, options, callback) {       
        var sessionId = null;
        var sessionId = options['sessionId'] ?? req.cookies.PHPSESSID;              
        var user = await this.authUser(sessionId);

        if (user == false) {
            return this.fail("Access denied",401);
        }

        try {
            return this.success(user,options);
        } catch (error) {
            return this.error(error);
        }
    }

    async authUser(sessionId) {
        if (isEmpty(sessionId) == true) {           
            return false;
        }
        // read php session data
        var data = await Utils.readPHPSession(sessionId,'/var/lib/php/sessions');
        var userId = data['auth.id'] ?? null;
        
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
