'use strict';
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Url_host;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
class Url {
    constructor() {
        _Url_host.set(this, void 0);
    }
    setHost(host) {
        __classPrivateFieldSet(this, _Url_host, host, "f");
    }
    get host() {
        return __classPrivateFieldGet(this, _Url_host, "f");
    }
    getHost(relative) {
        return (relative == true) ? '' : this.host;
    }
    view(relative) {
        return this.getHost(relative) + '/arikaim/view/';
    }
    templates(relative) {
        return this.view(relative) + 'templates/nodejs/';
    }
    librariesPath(relative) {
        return this.view(relative) + 'library/';
    }
    template(name, relative) {
        return this.templates(relative) + name + '/';
    }
    library(name, relative) {
        return this.librariesPath(relative) + name + '/';
    }
    components(relative) {
        return this.view(relative) + 'components/';
    }
    component(name, relative) {
        return this.components(relative) + name + '/';
    }
}
_Url_host = new WeakMap();
exports.default = Url;
