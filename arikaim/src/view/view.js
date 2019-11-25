'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');

module.exports = class View {
 
    constructor() {
        this.loader = new TwingLoaderFilesystem('./templates');
        this.twing = new TwingEnvironment(loader);
    }

    render(name, params) {

    }
}