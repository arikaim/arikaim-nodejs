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
        this.#io = new Server(httpServer,config.cors);   
        this.#usersNamespace = this.#io.of('/users');  
        this.#users = new Map();     
    }

    async boot() {
        // main namespace
        this.io.on('connection', (socket) => {
            console.log("Connected");
        });

        this.io.on('disconnect', (socket) => {
            console.log("Disconnected");
        });

        this.io.on('error', (error) => {
            console.log(error); 
        });

        // users namespace 
        this.#usersNamespace.use( async (socket, next) => {
            var cookieData = cookie.parse(socket.handshake.headers.cookie);
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

        this.#usersNamespace.on('connection', async (socket) => {
            // auth
            console.log('Connected User');
            console.log(socket.user);
        });

        this.#usersNamespace.on('disconnect', (socket) => {
            console.log("Disconnected User");
            //delete this.#users[]
        });

        this.#usersNamespace.on('error', (error) => {
            console.log(error); 
        });
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
