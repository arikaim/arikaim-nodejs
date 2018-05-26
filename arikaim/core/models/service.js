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

class Service extends Model {
 
    define(sequelize) {
        this.model = sequelize.define('service', {
            id:             { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
            name:           { type: Sequelize.STRING, allowNull: true, unique: true, defaultValue: null },
            title:          { type: Sequelize.STRING, allowNull: true, defaultValue: null },
            description:    { type: Sequelize.STRING, allowNull: true, defaultValue: null },
            status:         { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
            uuid:           { type: Sequelize.STRING, allowNull: false, unique: true },
            permission:     { type: Sequelize.STRING, allowNull: true, defaultValue: null },
            permission_type:{ type: Sequelize.STRING, allowNull: true, defaultValue: null },
            type:           { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
        },{
            timestamps: false,
            engine: 'InnoDB'
        });
    }

}

module.exports = Service;