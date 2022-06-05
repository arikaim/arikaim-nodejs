'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { default as Job } from "@arikaim/arikaim-services/queue/job.js"

export default class MyJob extends Job {

    init() {
        
    }
    
    execute() {
        console.log('execited  test job');      
    }
}