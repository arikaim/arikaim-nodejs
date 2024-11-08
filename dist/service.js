'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim Server server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
class ArikaimService {
    constructor(router, httpServer, config) {
        this._router = router;
        this._httpServer = httpServer;
        this.config = config;
    }
    get httpServer() {
        return this._httpServer;
    }
    get router() {
        return this._router;
    }
    boot() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    bootConsole() { }
}
exports.default = ArikaimService;
