


import  { default as ArikaimService }  from "@arikaim/arikaim-services/service.js"
import  { default as ChatApi }  from "./controllers/chat-api.js"

export default class ChatService extends ArikaimService {

    boot() { 
        var api = new ChatApi();

        console.log(passport);
        // 
        console.log('Chat api routes');

        console.log(passport.authenticate('bearer',{ session: false }));

        this.router.get('/home',passport.authenticate('bearer',{ session: false }),api.home);
    }
}