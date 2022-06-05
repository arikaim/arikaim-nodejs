'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import Uuid from './../utils/uuid.js';

export default class Job {

    #id = null;
    #name = null;
    #params = {};
    #dateCreated = null;
    #dateExecuted = null;
    #interval = null;
    #scheduleTime = null;
    #status = 0
    #priority = 0;
    #fileName = null;
    #serviceName = null;
    #options = null;

    constructor(options) {
        options = (isObject(options) == false) ? {} : options;  
        this.#options = options;
        this.#id = options['uuid'] ?? options['id'] ?? Uuid.create();   
        this.#name = options['name'];
        this.#serviceName = options['serviceName'] ?? options['service_name'] ?? null;
        this.#fileName = options['fileName'];
        this.#scheduleTime = options['scheduleTime'] ?? options['schedule_time'] ?? null;
        this.#interval = options['interval'] ?? options['recuring_interval'] ?? null;
        this.#params = options['params'] ?? null;
        this.#dateCreated = options['dateCreated'] ?? options['date_created'] ?? Date.now()
        this.#status = options['status'] ?? Job.STATUS_PENDING
        this.#priority = options['priority'] ?? 0; 

        if (isEmpty(this.#interval) == false && isEmpty(this.#scheduleTime) == false) {
            this.#scheduleTime = null;
        }

        this.init();
    }

    init() {
        // job init
    }

    execute() {
        // job code
    }
    

    isRecuring() {
        return (isEmpty(this.#interval) == false);
    }

    isScheduled() {
        return (isEmpty(this.#scheduleTime) == false);
    }

    static get STATUS_CREATED() {
        return 0;
    }

    static get STATUS_PENDING() {
        return 1;
    }

    static get STATUS_COMPLETED() {
        return 2;
    }
    
    static get STATUS_EXECUTED() {
        return 3;
    }

    static get STATUS_SUSPENDED() {
        return 5;
    }

    static get STATUS_ERROR() {
        return 10;
    }

    get options() {
        return this.#options;
    }

    get serviceName() {
        return this.#serviceName;
    }

    get fileName() {
        return this.#fileName;
    }

    get dateExecuted() {
        return this.#dateExecuted;
    }

    set dateExecuted(value) {
        this.#dateExecuted = value;
    }

    get name() {
        return this.#name;
    }

    get id() {
        return this.#id;
    }

    set name(value) {
        this.#name = value;
    }
}