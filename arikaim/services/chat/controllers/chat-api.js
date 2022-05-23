
import { default as Model } from "@arikaim/arikaim-services/db/model.js"
import { default as Contoller } from "@arikaim/arikaim-services/controller.js"

export default class ChatApi extends Contoller {
   
    home = async (req, res) => {
        var Users = await Model.create('users');

        const users = await Users.findOne({
            where: {
                id: 1
            }
        });
        //console.log(users.user_name);
        this.field('test',100);
        this.message('chat api');
        
        this.send(res);
    }
}