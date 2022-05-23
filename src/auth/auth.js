
import passport from "passport";
import BearerStrategy from "passport-http-bearer";

export default class Auth {

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

