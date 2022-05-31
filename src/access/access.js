'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import passport from "passport";
import BearerStrategy from "passport-http-bearer";

export default class Access {

    constructor() {
        passport.initialize();

        passport.use(new BearerStrategy(
            function(token, done) {
        

                return done(null,user);        
            }
        ));
        // set global var
        global.passport = passport;
    }
}
