
export default class ChatApi {
    constructor() {       
    }
  
    home = (req, res, next) => {
        res.send('Hello World!');
    }
}