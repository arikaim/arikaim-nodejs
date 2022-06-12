'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { Server } from "socket.io";
import cookie from 'cookie';
import access from '@arikaim/arikaim-services/access/access.js';

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
        this.#usersNamespace.use( async (socket, next) => {
            socket.user = await access.getStrategy('php-session').authenticateSocket(socket);

            if (socket.user == false) {
                console.log('err auth');               
                next(new Error('Not autorized'));
            } else {                      
                next();    
            }
                 
        });

        this.#usersNamespace.on('connection', async (socket) => {
    
          
            
            // auth
          
           
            console.log('Connected');
           

            console.log(socket.user);

        });

        this.#usersNamespace.on('disconnect', (socket) => {
            console.log("Disconnected ");
        });

        this.#usersNamespace.on('error', (error) => {
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
