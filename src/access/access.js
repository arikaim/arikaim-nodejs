'use strict';
/**
 * Arikaim server
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { default as Model } from "@arikaim/server/db/model.js"
import passport from "passport";

import PHPSessionStrategy from './providers/php-session.js';

class Access {

    #passport = null;
    #usersModel = null;
    #strategies = {};

    constructor() {
        this.#passport = passport;
        this.#strategies = {};
    }

    async init() {
        // create db models
        this.#usersModel = await Model.create('users');
    
       // this.add('php-session',new PHPSessionStrategy({},this.#usersModel));
    }

    hasControlPanelAccess(id) {
    }

    hasAccess(name, id) {
    }

    add(name, strategy) {
        this.#strategies[name] = strategy;      
        this.#passport.use(name,strategy);        
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