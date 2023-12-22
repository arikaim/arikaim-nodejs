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
    #strategies = {};

    constructor() {
        this.#passport = passport;
        this.#strategies = {};
    }

    async init() {
        // create db models
        this.#usersModel = await Model.create('users');
        this.#tokensModel = await Model.create('access-tokens');

        // add strategies
        var phpSession = new PHPSessionStrategy({},this.#usersModel);
        var bearer = new BearerStrategy(
            function(token, done) {
                return done(null,user);        
            }
        );

        // init passport 
        this.#passport.initialize();
       
        this.add('php-session',phpSession);
    }

    hasControlPanelAccess(id) {

    }

    hasAccess(name, id) {

    }

    add(name, strategy) {
        this.#strategies[name] = strategy;      
        this.#passport.use(strategy);        
    }

    getStrategy(name) {
        return this.#strategies[name];
    }

    get passport() {
        return this.#passport;
    }

    get users() {
        return this.#usersModel;
    }
    
    static getInstance() {
        global.access = (global.access === undefined) ? new Access() : global.access;      
        return global.access; 
    }
}

export default Access.getInstance();