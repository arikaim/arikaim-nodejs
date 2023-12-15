'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { DataTypes, Model } from 'sequelize';
import findById from './../query/find.js';

export default class Permissions extends Model {

    static init(connection) {
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
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },{ 
            connection,
            modelName: 'Permissions',
            timestamps: false,
            tableName: 'permissions',
            scopes: {                
            }
        });
        // add custom methods
        this.findById = findById;
    }
}

