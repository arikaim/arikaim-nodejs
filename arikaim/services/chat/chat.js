


import  { default as ArikaimService }  from "@arikaim/arikaim-services/src/service.js"
import  { default as ChatApi }  from "./controllers/ChatApi.js"

export default class ChatService extends ArikaimService {

    boot() { 
        var api = new ChatApi();

        console.log('Chat api routes');
        this.router.get('/home',api.home);
    }
}