'use strict';
/**
 * Arikaim Server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Server } from "socket.io";
import access from '@arikaim/server/access/access.js';
import cookie from 'cookie';
import logger from '@arikaim/server/system/logger.js'

export default class SocketServer {

    private _io: any;
    private _usersNamespace: any;
    private _users: any;
    private _clients: any;
    public onConnect: any

    constructor(httpServer, config) {
        this._io = new Server(httpServer,config);   
        this._usersNamespace = this._io.of('/users');  
        this._users = new Map();     
        this._clients = new Map();   
        this.onConnect = 'initSocket'
    }

    initSocket(client) {

    };

    async boot() {

        // main namespace
        this._io.on('connection', (socket) => {
            logger.info("Web socket client connected.");
            this._clients.set(socket,socket.id);

            this.onConnect(socket);           
        });

        this._io.on('disconnect', (socket) => {
            logger.info("Web socket client disconnected");
        });

        this._io.on('error', (error) => {
            logger.error(error); 
        });

        // users namespace 
        this._usersNamespace.use( async (socket, next) => {

            var phpSession = (socket.handshake.headers.tokentype == 'php-session') ?  socket.handshake.headers.token : socket.handshake.headers.cookie;
              
            if (isEmpty(phpSession) == true) {
                logger.error('Cookie data is empty Not autorized');
                next(new Error('Cookie data is empty Not autorized'));
                return;
            }

            var cookieData = cookie.parse(phpSession);
            var sessionId = cookieData.PHPSESSID ?? null;

            socket.user = await access.getStrategy('php-session').authUser(sessionId);

            if (socket.user == false) {                         
                next(new Error('Not autorized'));
            } else {              
                // authorized
                socket.user['socketId'] = socket.id;
                var userId = socket.user.uuid ?? socket.user.id;
                this._users[userId] = socket.user;   
                next();    
            }                 
        });

        logger.info('Socket server started ');
    }

    stop() {

    }
    
    emit(eventName, ...args) {
        this._io.sockets.emit(eventName,...args);
    }

    emitTo(id, eventName, ...args) {
        var socket = this.getUserSocket(id);
        if (isObject(socket) == true) {
            socket.emit(eventName,...args);
            return true;
        } else {
            return false;
        }
    }

    usersOn(eventName, callback) {
        this._usersNamespace.on(eventName,callback);
    }
    
    usersEmit(eventName, ...args) {
        this._usersNamespace.sockets.emit(eventName,...args);
    }

    findUser(id) {
        if (this._users.has(id) == true) {
            return this._users.get(id);
        } else {    
            var user = this._users.find((item) => item.socketId === id);
            if (isObject(user) == true) {
                return user;
            } else {
                return this._users.find((item) => item.id === id);
            }
        }
    }

    getUserSocket(id) {
        var user = findUser(id);

        return (isObject(user) == true) ? this.io.sockets[user.socketId] : null;           
    }

    on(eventName, callback) {
        this._io.on(eventName,callback);
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
