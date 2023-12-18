'use strict';
/**
 * Arikaim services server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

export default class ArikaimService {
    #router;
    
    constructor(router, express, config) {
        this.#router = router;
        this.express = express;
        this.config = config;
    }

    get router() {
        return this.#router;
    }

    async boot() {}
}