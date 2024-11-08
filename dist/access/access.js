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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Access_passport, _Access_usersModel, _Access_strategies;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim server
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
const model_js_1 = __importDefault(require("@arikaim/server/db/model.js"));
const passport_1 = __importDefault(require("passport"));
class Access {
    constructor() {
        _Access_passport.set(this, null);
        _Access_usersModel.set(this, null);
        _Access_strategies.set(this, {});
        __classPrivateFieldSet(this, _Access_passport, passport_1.default, "f");
        __classPrivateFieldSet(this, _Access_strategies, {}, "f");
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // create db models
            __classPrivateFieldSet(this, _Access_usersModel, yield model_js_1.default.create('users'), "f");
            // this.add('php-session',new PHPSessionStrategy({},this.#usersModel));
        });
    }
    hasControlPanelAccess(id) {
    }
    hasAccess(name, id) {
    }
    add(name, strategy) {
        __classPrivateFieldGet(this, _Access_strategies, "f")[name] = strategy;
        __classPrivateFieldGet(this, _Access_passport, "f").use(name, strategy);
    }
    getStrategy(name) {
        return __classPrivateFieldGet(this, _Access_strategies, "f")[name];
    }
    get passport() {
        return __classPrivateFieldGet(this, _Access_passport, "f");
    }
    get users() {
        return __classPrivateFieldGet(this, _Access_usersModel, "f");
    }
    static getInstance() {
        global.access = (global.access === undefined) ? new Access() : global.access;
        return global.access;
    }
}
_Access_passport = new WeakMap(), _Access_usersModel = new WeakMap(), _Access_strategies = new WeakMap();
exports.default = Access.getInstance();
