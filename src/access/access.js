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
import passportCustom from 'passport-custom';
import Utils from './../utils/utils.js';


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
        
        const CustomStrategy = passportCustom.Strategy;
        this.#passport.use('php-session', new CustomStrategy(
            async (req, callback) => {
                var user = false;
                if (isEmpty(req.cookies.PHPSESSID) == false) {
                    // read php session data
                    var data = await Utils.readPHPSession(req.cookies.PHPSESSID,'/var/lib/php/sessions');
                    console.log(data);
                    this.findUser(1);
                }
                console.log(req.cookies);
                // Do your custom user finding logic here, or set to false based on req object
                callback(null, user);
            }
        ));        
    }

    get passport() {
        return this.#passport;
    }

    async findUser(id) {
        var user = await this.#usersModel.findById(id);
        console.log(user);
       // var user = this.#usersModel.findOne({
       //     where: {

       //     }
       // })
    }

    static getInstance() {
        global.access = (global.access === undefined) ? new Access() : global.access;      
        return global.access; 
    }
}

export default Access.getInstance();