'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

export default class ArikaimService {
    #router;

    constructor(router) {
        this.#router = router;
    }

    get router() {
        return this.#router;
    }

    boot() {}
}