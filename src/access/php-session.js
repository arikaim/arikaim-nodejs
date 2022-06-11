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

    /**
     * Authenticate.
     * @param {Object} req HTTP request object.
     * @api protected
     */
    async authenticate(req, options) {
        var user = false;
        if (isEmpty(req.cookies.PHPSESSID) == false) {
            // read php session data
            var data = await Utils.readPHPSession(req.cookies.PHPSESSID,'/var/lib/php/sessions');
            var userId = data['auth.id'] ?? null;
            
            if (isEmpty(userId) == false) {
                user = await this.userModel.findById(userId);
            }                   
        }
               
        if (user == false) {
            return this.fail("Access denied",401);
        }

        try {
            return this.success(user,options);
        } catch (ex) {
            return this.error(ex);
        }
    }

    get options() {
        return this.#options;
    }
}
