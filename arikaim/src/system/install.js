'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

const System = require('./arikaim/core/system/system.js');
const Arikaim = include('core/arikaim.js');




const Services = include('core/system/services.js');
var services = new Services();

this.init().then(result => {
    System.log('Install');          
  
    var service = this.db.create('Service');
   

    this.db.sequelize.sync().then(resut => {
        System.log('Database tables created');
        services.install();
    }).catch(error => {
        System.log('Error create database tables');
        this.exit();
    });
}).catch(error => {
    System.log('Error install Arikaim Services');
    this.exit();
});
