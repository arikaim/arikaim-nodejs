'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _ArikaimServicesServer_config, _ArikaimServicesServer_express, _ArikaimServicesServer_httpServer, _ArikaimServicesServer_services;
Object.defineProperty(exports, "__esModule", { value: true });
exports.arikaimServer = void 0;
/**
 * Arikaim server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
require("@arikaim/arikaim/common/global.js");
require("@arikaim/server/system/global.js");
const path_js_1 = __importDefault(require("@arikaim/arikaim/common/path.js"));
const package_js_1 = __importDefault(require("@arikaim/arikaim/common/package.js"));
const fs_1 = require("fs");
const config_js_1 = require("./system/config.js");
const db_js_1 = __importDefault(require("./db/db.js"));
const access_js_1 = __importDefault(require("./access/access.js"));
const view_js_1 = __importDefault(require("./view/view.js"));
const service_js_1 = __importDefault(require("./core-api/service.js"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http"));
const process_1 = require("process");
/**
 *  Server class
 */
class ArikaimServicesServer {
    constructor() {
        _ArikaimServicesServer_config.set(this, null);
        _ArikaimServicesServer_express.set(this, null);
        _ArikaimServicesServer_httpServer.set(this, null);
        _ArikaimServicesServer_services.set(this, void 0);
        __classPrivateFieldSet(this, _ArikaimServicesServer_services, [], "f");
    }
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            writeLn('Server boot ...\n', 'green');
            // load server config 
            __classPrivateFieldSet(this, _ArikaimServicesServer_config, yield (0, config_js_1.loadConfig)(), "f");
            if (__classPrivateFieldGet(this, _ArikaimServicesServer_config, "f") === false) {
                (0, process_1.exit)();
            }
            ;
            logger.info('Loaded config file ');
            // init db  
            logger.info('Db connection ...');
            yield db_js_1.default.connect(__classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").database);
            // init auth
            yield access_js_1.default.init();
            // init template engine
            const view = view_js_1.default.create(__classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").settings.primaryTemplate);
            // init express
            __classPrivateFieldSet(this, _ArikaimServicesServer_express, (0, express_1.default)(), "f");
            // add helmet protection
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use((0, helmet_1.default)({
                strictTransportSecurity: false,
                xContentTypeOptions: false,
                contentSecurityPolicy: {
                    useDefaults: false,
                    directives: {
                        defaultSrc: ["'self'"],
                        scriptSrc: ["'self'"],
                        styleSrc: ["'self'"],
                        imgSrc: ["'self'"],
                        upgradeInsecureRequests: null
                    }
                }
            }));
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use((0, cookie_parser_1.default)());
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use((0, cors_1.default)(__classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").cors));
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use((req, res, next) => {
                url.setHost(req.protocol + '://' + req.headers.host);
                res.renderPage = (name, params, language) => {
                    const html = view.renderPage(name, params, language);
                    res.send(html);
                };
                next();
            });
            // static files
            logger.info('Add static folder ' + path_js_1.default.template(__classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").settings.primaryTemplate));
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use(express_1.default.static(path_js_1.default.template(__classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").settings.primaryTemplate)));
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use(express_1.default.static(path_js_1.default.libraries()));
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use(express_1.default.static(path_js_1.default.publicStorage()));
            // logger 
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use(logger.getExpressMiddleware());
            // web server
            __classPrivateFieldSet(this, _ArikaimServicesServer_httpServer, http.createServer(__classPrivateFieldGet(this, _ArikaimServicesServer_express, "f")), "f");
            process.on('SIGTERM', () => { this.stop(); });
            process.on('SIGINT', () => { this.stop(); });
            // load services 
            yield this.loadServices();
            return true;
        });
    }
    get server() {
        return __classPrivateFieldGet(this, _ArikaimServicesServer_httpServer, "f");
    }
    stop() {
        this.server.close((err) => {
            logger.warn('Http server shutdown.');
            logger.warn('Db connection close.');
            db_js_1.default.close();
            process.exit(err ? 1 : 0);
        });
    }
    run() {
        // http server
        __classPrivateFieldGet(this, _ArikaimServicesServer_httpServer, "f").listen(__classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").port, __classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").host, () => {
            logger.info('Server started at ' + __classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").host + ":" + __classPrivateFieldGet(this, _ArikaimServicesServer_config, "f").port, 'green');
        });
    }
    get services() {
        return __classPrivateFieldGet(this, _ArikaimServicesServer_services, "f");
    }
    bootConsole() {
        __classPrivateFieldSet(this, _ArikaimServicesServer_services, (0, fs_1.readdirSync)(servicesPath).filter(function (file) {
            return (0, fs_1.statSync)(servicesPath + path_1.default.sep + file).isDirectory();
        }), "f");
    }
    scanServices(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            var servicesPath = path_js_1.default.services();
            __classPrivateFieldSet(this, _ArikaimServicesServer_services, (0, fs_1.readdirSync)(servicesPath).filter(function (file) {
                return (0, fs_1.statSync)(servicesPath + path_1.default.sep + file).isDirectory();
            }), "f");
            for (var serviceName of __classPrivateFieldGet(this, _ArikaimServicesServer_services, "f")) {
                // load package description
                var packageDescriptor = package_js_1.default.loadPackageDescriptor(serviceName, 'service');
                if (packageDescriptor.disabled === true || packageDescriptor.type != 'nodejs') {
                    // service is disabled
                    continue;
                }
                var serviceFile = servicesPath + serviceName + path_1.default.sep + serviceName + '.js';
                var { default: serviceClass } = yield Promise.resolve(`${serviceFile}`).then(s => __importStar(require(s)));
                service = new serviceClass(router, __classPrivateFieldGet(this, _ArikaimServicesServer_httpServer, "f"), __classPrivateFieldGet(this, _ArikaimServicesServer_config, "f"));
                callback(service);
            }
        });
    }
    loadServices() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('Boot services ...');
            const router = express_1.default.Router();
            var service;
            // load core api routes
            service = new service_js_1.default(router, __classPrivateFieldGet(this, _ArikaimServicesServer_httpServer, "f"), __classPrivateFieldGet(this, _ArikaimServicesServer_config, "f"));
            yield service.boot();
            __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use('/', service.router);
            yield this.scanServices(function (service) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield service.boot();
                    __classPrivateFieldGet(this, _ArikaimServicesServer_express, "f").use('/', service.router);
                    logger.info('Service loaded ' + serviceName);
                });
            });
        });
    }
    static getInstance() {
        if (global.arikaimServer === undefined) {
            global.arikaimServer = new ArikaimServicesServer();
        }
        return global.arikaimServer;
    }
}
_ArikaimServicesServer_config = new WeakMap(), _ArikaimServicesServer_express = new WeakMap(), _ArikaimServicesServer_httpServer = new WeakMap(), _ArikaimServicesServer_services = new WeakMap();
exports.default = ArikaimServicesServer;
exports.arikaimServer = ArikaimServicesServer.getInstance();
