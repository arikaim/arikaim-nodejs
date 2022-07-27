'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { DataTypes, Model } from 'sequelize';
import Uuid from './../../utils/uuid.js';
import findById from './../query/find.js';

export default class Queue extends Model {

    static init() {
        super.init({
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
                unique: true
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
            sequelize,
            hooks: { 
                beforeValidate: (instance, options) => {
                    instance.uuid = (isEmpty(instance.uuid) ==true) ? Uuid.create() : instance.uuid
                }
            },            
            modelName: 'Queue',
            timestamps: false,
            tableName: 'jobs'
        });

        this.findById = findById;
    }
}

Queue.init();