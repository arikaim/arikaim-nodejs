'use strict';
/**
 * Arikaim services server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

export default class ArikaimService {
    #router;
    #httpServer;

    constructor(router, httpServer, config) {
        this.#router = router;
        this.#httpServer = httpServer;
        this.config = config;
    }

    get httpServer() {
        return this.#httpServer;
    }

    get router() {
        return this.#router;
    }

    async boot() {}
}