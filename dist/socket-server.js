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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Arikaim Server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/
const socket_io_1 = require("socket.io");
const access_js_1 = __importDefault(require("@arikaim/server/access/access.js"));
const cookie_1 = __importDefault(require("cookie"));
const logger_js_1 = __importDefault(require("@arikaim/server/system/logger.js"));
class SocketServer {
    constructor(httpServer, config) {
        this._io = new socket_io_1.Server(httpServer, config);
        this._usersNamespace = this._io.of('/users');
        this._users = new Map();
        this._clients = new Map();
        this.onConnect = 'initSocket';
    }
    initSocket(client) {
    }
    ;
    boot() {
        return __awaiter(this, void 0, void 0, function* () {
            // main namespace
            this._io.on('connection', (socket) => {
                logger_js_1.default.info("Web socket client connected.");
                this._clients.set(socket, socket.id);
                this.onConnect(socket);
            });
            this._io.on('disconnect', (socket) => {
                logger_js_1.default.info("Web socket client disconnected");
            });
            this._io.on('error', (error) => {
                logger_js_1.default.error(error);
            });
            // users namespace 
            this._usersNamespace.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                var phpSession = (socket.handshake.headers.tokentype == 'php-session') ? socket.handshake.headers.token : socket.handshake.headers.cookie;
                if (isEmpty(phpSession) == true) {
                    logger_js_1.default.error('Cookie data is empty Not autorized');
                    next(new Error('Cookie data is empty Not autorized'));
                    return;
                }
                var cookieData = cookie_1.default.parse(phpSession);
                var sessionId = (_a = cookieData.PHPSESSID) !== null && _a !== void 0 ? _a : null;
                socket.user = yield access_js_1.default.getStrategy('php-session').authUser(sessionId);
                if (socket.user == false) {
                    next(new Error('Not autorized'));
                }
                else {
                    // authorized
                    socket.user['socketId'] = socket.id;
                    var userId = (_b = socket.user.uuid) !== null && _b !== void 0 ? _b : socket.user.id;
                    this._users[userId] = socket.user;
                    next();
                }
            }));
            logger_js_1.default.info('Socket server started ');
        });
    }
    stop() {
    }
    emit(eventName, ...args) {
        this._io.sockets.emit(eventName, ...args);
    }
    emitTo(id, eventName, ...args) {
        var socket = this.getUserSocket(id);
        if (isObject(socket) == true) {
            socket.emit(eventName, ...args);
            return true;
        }
        else {
            return false;
        }
    }
    usersOn(eventName, callback) {
        this._usersNamespace.on(eventName, callback);
    }
    usersEmit(eventName, ...args) {
        this._usersNamespace.sockets.emit(eventName, ...args);
    }
    findUser(id) {
        if (this._users.has(id) == true) {
            return this._users.get(id);
        }
        else {
            var user = this._users.find((item) => item.socketId === id);
            if (isObject(user) == true) {
                return user;
            }
            else {
                return this._users.find((item) => item.id === id);
            }
        }
    }
    getUserSocket(id) {
        var user = findUser(id);
        return (isObject(user) == true) ? this.io.sockets[user.socketId] : null;
    }
    on(eventName, callback) {
        this._io.on(eventName, callback);
    }
    get usersNamespace() {
        return this._usersNamespace;
    }
    get users() {
        return this._users;
    }
    get io() {
        return this._io;
    }
    get clients() {
        return this._clients;
    }
}
exports.default = SocketServer;
