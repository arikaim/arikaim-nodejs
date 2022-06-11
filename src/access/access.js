'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { default as Model } from "@arikaim/arikaim-services/db/model.js"
import passport from "passport";
import BearerStrategy from "passport-http-bearer";
import PHPSessionStrategy from './php-session.js';

class Access {

    #passport = null;
    #usersModel = null;
    #tokensModel = null;

    constructor() {
        this.#passport = passport;
    }

    async init() {
        // create db models
        this.#usersModel = await Model.create('users');
        this.#tokensModel = await Model.create('access-tokens');

        // init passport 
        this.#passport.initialize();
       
        this.#passport.use(new BearerStrategy(
            function(token, done) {
                return done(null,user);        
            }
        ));
        
        this.#passport.use('php-session', new PHPSessionStrategy({},this.#usersModel));    
    }

    get passport() {
        return this.#passport;
    }

    async findUser(id) {
        return await this.#usersModel.findById(id);       
    }

    static getInstance() {
        global.access = (global.access === undefined) ? new Access() : global.access;      
        return global.access; 
    }
}

export default Access.getInstance();