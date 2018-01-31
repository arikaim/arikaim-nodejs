
const Arikaim  = require('./arikaim/core/arikaim.js');

var arikaim = new Arikaim();

arikaim.get('',function(request,response) {
    response.send('hello');
});
arikaim.run();