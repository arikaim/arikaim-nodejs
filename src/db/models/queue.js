'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { DataTypes, Model } from 'sequelize';
import Uuid from './../../utils/uuid.js';
import findById from './../query/find.js';

class Queue extends Model {
    findById = findById;
}

export default Queue.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    handler_class: {
        type: DataTypes.STRING,
        allowNull: false
    },
    recuring_interval: {
        type: DataTypes.STRING,
        allowNull: true
    },
    extension_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    service_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    executed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    date_created: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    schedule_time: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    date_executed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    queue: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    sequelize: sequelize,
    hooks: { 
        beforeValidate: (instance, options) => {
            instance.uuid = (isEmpty(instance.uuid) ==true) ? Uuid.create() : instance.uuid
        }
    },            
    modelName: 'Queue',
    timestamps: false,
    tableName: 'queue'
});
