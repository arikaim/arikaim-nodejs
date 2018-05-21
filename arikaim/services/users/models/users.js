'use strict';
/**
 * Arikaim Services
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) 2017-2018 Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

const Model = include('core/system/model.js');
const Sequelize = require('sequelize');

class Users extends Model {

    define(sequelize) {
        this.model = sequelize.define('users',{
            id:                 { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
            email:              { type: Sequelize.STRING, allowNull: true, unique: true, defaultValue: null },
            user_name:          { type: Sequelize.STRING, allowNull: false, unique: true },
            password:           { type: Sequelize.STRING, allowNull: false },
            api_key:            { type: Sequelize.STRING, unique: true, allowNull: true },
            api_secret:         { type: Sequelize.STRING, allowNull: true },
            status:             { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
            uuid:               { type: Sequelize.STRING, allowNull: false, unique: true },
            last_login:         { type: Sequelize.BIGINT, allowNull: true },
            access_key:         { type: Sequelize.STRING, allowNull: true, unique: true },
            access_key_expire:  { type: Sequelize.BIGINT, allowNull: true }
        },{
            timestamps: false,
            engine: 'InnoDB'
        });
    }
    
}

module.exports = Users;