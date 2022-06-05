


import  { default as ArikaimService }  from "@arikaim/arikaim-services/service.js"
import  { default as ChatApi }  from "./controllers/chat-api.js"

export default class ChatService extends ArikaimService {

    async boot() { 
        var api = new ChatApi();

      //  console.log(passport);
        // 
      //  console.log('Chat api routes');

       // console.log(passport.authenticate('bearer',{ session: false }));
 // ,passport.authenticate('bearer',{ session: false })
        this.router.get('/home',api.home);


      //  var job = await queue.createJob('testjob','chat');

       // var job = queue.getJobDue().then( (job) => {
        //  console.log(job);
       // });
       

        //queue.addJob(job);

       // queue.executeJob(job);

    //  console.log('add completed');

     // console.log(queue);

      queue.on('completed',function(job) {
        console.log(job.options);
      });

    }
}