import { default as Model } from "@arikaim/arikaim-services/db/model.js"
import { default as Job } from "@arikaim/arikaim-services/queue/job.js"
import Path from './../system/path.js';

export default class Queue {

    #queueModel = null;
    #interval = null;
   
    constructor() {
    }

    async boot() {
        this.#queueModel = await Model.create('queue');
    }

    async createJob(jobFile, serviceName, options) {        
        if (isEmpty(serviceName) == true) {
           return null;
        }
        var jobPath = Path.getJobsPath(serviceName,jobFile);
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

        console.log('execute');

        job.execute();
        job.dateExecuted = Date.now();
    }

    async getJobDue() {
        return new Promise( (resolve,reject) => {
            this.#queueModel.findOne({
                whene: {
                    status: Job.STATUS_PENDING()
                },
                raw: true,
            }).then( (model) => {
                var job = this.createJob(model.handler_class,model.service_name, model);
                job.then( (result) => {
                    result.init(model);
                    resolve(result);      
                })
                    
            }).catch( (error) => {
                reject(error);
            });
        });
    }

    async addJob(job) {
       // console.log(job);

        var item = await this.#queueModel.create({
            name: job.name,
            handler_class: job.fileName,
            service_name: job.serviceName,
            schedule_time: job.scheduleTime,
            recuring_interval: job.interval
        });
        
    }

    run() {
        this.getJobDue().then( (job) => {
            if (isObject(job) == true) {
             
                console.log(job);
                this.executeJob(job);
            }
        }).catch( (error) => {
            console.log(error);
        });

    }
}