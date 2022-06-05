'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Server } from "socket.io";

export default class SocketServer {

    #io = null;
    #usersNamespace = null;
    #users = [];
    
    constructor(httpServer, config) {
        this.#io = new Server(httpServer,config.cors);   
        this.#usersNamespace = this.#io.of('/users');
        this.boot();
    }

    async boot() {
        // main namespace
        this.io.on('connection', (socket) => {
            console.log("Connected ");
        });

        this.io.on('disconnect', (socket) => {
            console.log("Disconnected ");
        });

        this.io.on('error', (error) => {
            console.log(error); 
        });

        // users namespace 
        this.#usersNamespace.on('connection', (socket) => {
            const token = socket.handshake.auth.token;
            console.log("Connected ");
            console.log(token);
        });

        this.#usersNamespace.on('disconnect', (socket) => {
            console.log("Disconnected ");
        });

        this.$usersNamespace.on('error', (error) => {
            console.log(error); 
        });
    }

    toUser(user, eventName, ...args) {

    }

    getUserConnection(user) {

    }

    on(eventName, callback) {
        this.#io.on(eventName,callback);
    }

    get io() {
        return this.#io;
    }
}
