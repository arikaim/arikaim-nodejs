
import  { default as ArikaimService }  from "@arikaim/arikaim-services/src/service.js"

export default class OneService extends ArikaimService {

    boot() { 
        console.log('boo one');
    }
}