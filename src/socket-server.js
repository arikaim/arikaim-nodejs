'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Server } from "socket.io";
import access from '@arikaim/arikaim-server/access/access.js';
import cookie from 'cookie';

export default class SocketServer {

    #io;
    #usersNamespace;
    #users;
    #clients;

    constructor(httpServer, config) {
        this.#io = new Server(httpServer,config);   
        this.#usersNamespace = this.#io.of('/users');  
        this.#users = new Map();     
        this.#clients = new Map();   
        this.onConnect = 'initSocket'
    }

    initSocket(client) {};

    async boot() {

        // main namespace
        this.#io.on('connection', (socket) => {
            console.log("Web socket client connected.");
            this.#clients.set(socket,socket.id);

            this.onConnect(socket);           
        });

        this.#io.on('disconnect', (socket) => {
            console.log("Web socket client disconnected");
        });

        this.#io.on('error', (error) => {
            console.log(error); 
        });

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

    get clients() {
        return this.#clients;
    }
}
