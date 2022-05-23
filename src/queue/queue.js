

export default class Queue {

    #jobs = [];

    constructor() {
        this.#jobs.push(function() { console.log('test') });
    }

    getJobDue() {

    }

    addJob() {

    }

    run() {
        var job = this.getJobDue();
        if (isObject(job) == false) {
            return null;
        }

        // execute job
        this.executeJob();

        setTimeout(() => {
            this.run();
        })
    }
}