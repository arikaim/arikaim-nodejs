'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Server } from "socket.io";
import access from '@arikaim/arikaim-services/access/access.js';
import cookie from 'cookie';

export default class SocketServer {

    #io;
    #usersNamespace;
    #users;
    
    constructor(httpServer, config) {
        this.#io = new Server(httpServer,config);   
        this.#usersNamespace = this.#io.of('/users');  
        this.#users = new Map();     
    }

    async boot() {
        // users namespace 
        this.#usersNamespace.use( async (socket, next) => {

            var phpSession = (socket.handshake.headers.tokentype == 'php-session') ?  socket.handshake.headers.token : socket.handshake.headers.cookie;
              
            if (isEmpty(phpSession) == true) {
                console.log('Cookie data is empty Not autorized');
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
                this.#users[userId] = socket.user;   
                next();    
            }                 
        });

        writeLn('Socket server started ');
    }

    emit(eventName, ...args) {
        this.#io.sockets.emit(eventName,...args);
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
        this.#usersNamespace.on(eventName,callback);
    }
    
    usersEmit(eventName, ...args) {
        this.#usersNamespace.sockets.emit(eventName,...args);
    }

    findUser(id) {
        if (this.#users.has(id) == true) {
            return this.#users.get(id);
        } else {    
            var user = this.#users.find((item) => item.socketId === id);
            if (isObject(user) == true) {
                return user;
            } else {
                return this.#users.find((item) => item.id === id);
            }
        }
    }

    getUserSocket(id) {
        var user = findUser(id);

        return (isObject(user) == true) ? this.#io.sockets[user.socketId] : null;           
    }

    on(eventName, callback) {
        this.#io.on(eventName,callback);
    }

    get usersNamespace() {
        return this.#usersNamespace;
    }

    get users() {
        return this.#users;
    } 

    get io() {
        return this.#io;
    }
}
