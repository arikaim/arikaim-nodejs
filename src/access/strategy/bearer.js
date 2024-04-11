'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { default as Model } from "@arikaim/server/db/model.js"
import BearerStrategy from "passport-http-bearer";


var tokensModel = await Model.create('access-tokens');


export default new BearerStrategy(function(token, callback) {
    return callback(null,user);        
});