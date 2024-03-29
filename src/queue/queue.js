'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import Path from '@arikaim/arikaim/common/path.js';
import { default as Model } from "@arikaim/server/db/model.js"
import { default as Job } from "@arikaim/server/queue/job.js"
import { EventEmitter } from "events";

class Queue {

    #queueModel = null;
    #interval = null;
    #intervalTime = null;
    #eventsEmiter = null;

    constructor(options) {
        options = (isObject(options) == false) ? {} : options;  
        this.#intervalTime = options['interval'] ?? 2000; // 2 sec by default
        this.#eventsEmiter = new EventEmitter();
        this.#interval = null;
    }

    on(event, callback) {
        this.#eventsEmiter.addListener(event,callback);
    }

    async boot() {
        logger.info('Boot jobs queue ...');
        this.#queueModel = await Model.create('queue');
    }

    async createJob(jobFile, serviceName, options) {        
        if (isEmpty(serviceName) == true) {
           return null;
        }
        var jobPath = Path.jobs(serviceName,jobFile);
        if (isEmpty(jobPath) == true) {
            return null;
        }
        var { default: jobClass } = await import(jobPath);
        options = (isObject(options) == false) ? {} : options;  
        options['serviceName'] = serviceName;
        options['fileName'] = jobFile;

        return new jobClass(options);         
    }

    executeJob(job) {
        if (isObject(job) == false) {
            return false;
        }

        try {
            job.execute();
            job.dateExecuted = Date.now();
            job.status = Job.STATUS_COMPLETED;
    
            this.#eventsEmiter.emit('completed',job);
            // set job status
            this.setJobStatus(job,Job.STATUS_COMPLETED);
        } catch (error) {
            this.#eventsEmiter.emit('error',error);
        }
    }

    async deleteJob(job) {
        var uuid = (isObject(job) == true) ? job.id : job;

        var deleted = await this.#queueModel.destroy({
            where: {
               uuid: uuid
            }
        });

        return (deleted > 0);
    }

    async setJobStatus(job, status) {
        var uuid = (isObject(job) == true) ? job.id : job;
        var result = await this.#queueModel.update({
                status: status          
            }
        ,{ where: { uuid: uuid } });

        return (isEmpty(result) == false);
    }

    async getJobDue() {
        return new Promise( (resolve,reject) => {
            this.#queueModel.findOne({
                where: {
                    status: Job.STATUS_PENDING
                },
                raw: true,
            }).then( async (model) => {

                if (isObject(model) == false) {
                    return resolve(model);     
                }

                // create job obj
                var job = await this.createJob(model.handler_class,model.service_name, model);               
                resolve(result);      
              
            }).catch( (error) => {
                reject(error);
            });
        });
    }

    async addJob(job) {
        if (isObject(job) == false) {
            return false;
        }

        var item = await this.#queueModel.create({
            name: job.name,
            handler_class: job.fileName,
            service_name: job.serviceName,
            schedule_time: job.scheduleTime,
            recuring_interval: job.interval
        });
        
        return (item instanceof this.#queueModel);
    }

    isRunning() {
        return (isEmpty(this.#interval) == false);
    }

    run() {
        this.getJobDue().then( (job) => {
            if (isObject(job) == true) {
                this.executeJob(job);
            } else {
              
            }
        }).catch((error) => {
            logger.error(error);
        });

        if (this.isRunning() == false) {
            this.#interval = setInterval(() => {
                this.run();
            },this.#intervalTime);
        }
    }

    stop() {
        logger.info('Queue stop.');
        clearInterval(this.#interval);
    }

    static getInstance() {
        global.queue = (global.queue === undefined) ? new Queue() : global.queue;   
        return global.queue;    
    }
}

export default Queue.getInstance();