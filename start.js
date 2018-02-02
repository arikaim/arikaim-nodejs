const System = require('./arikaim/core/system/system.js');

const Arikaim = include('core/arikaim.js');

var arikaim = new Arikaim();

arikaim.get('',function(request,response) {
    response.send('hello');
});

arikaim.run();