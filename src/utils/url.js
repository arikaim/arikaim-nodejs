'use strict';
/**
 * Arikaim
 * 
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

export default class Url {
    #host;

    constructor() {
    }

    setHost(host) {
        this.#host = host;
    }

    get host() {
        return this.#host;
    }

    getHost(relative) {
        return (relative == true) ? '' : this.host;
    }

    view(relative) {
        return this.getHost(relative) + '/arikaim/view/'; 
    }

    templates(relative) {
        return this.view(relative) + 'templates' + path.sep + 'nodejs/'; 
    }

    librariesPath(relative) {
        return this.view(relative) + 'library/';
    }

    template(name,relative) {
        return this.templates(relative) + name + '/';
    }

    library(name,relative) {
        return this.librariesPath(relative) + name + '/'; 
    }

    components(relative) {
        return this.view(relative) + 'components/'; 
    }

    component(name,relative) {
        return this.components(relative) + name + '/'; 
    }
}
