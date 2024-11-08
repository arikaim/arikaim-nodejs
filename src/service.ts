'use strict';
/**
 * Arikaim Server server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

export default class ArikaimService {
    private _router: any;
    private _httpServer: any;
    private config: any

    constructor(router, httpServer, config) {
        this._router = router;
        this._httpServer = httpServer;
        this.config = config;
    }

    get httpServer() {
        return this._httpServer;
    }

    get router(): any {
        return this._router;
    }

    async boot() {}

    bootConsole() {}
}