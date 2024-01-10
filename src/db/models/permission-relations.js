'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { DataTypes, Model } from 'sequelize';
import findById from './../query/find.js';

class PermissionRelations extends Model {
    findById = findById;
}

export default  PermissionRelations.init({
    
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
    permission_id: {
        type: DataTypes.INTEGER
    },
    relation_id: {
        type: DataTypes.INTEGER
    },
    relation_type: {
        type: DataTypes.STRING,
        allowNull: false               
    },
    read: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    write: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    delete: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    execute: {
        type: DataTypes.INTEGER,
        allowNull: true
    }},{ 
        sequelize: sequelize,
        modelName: 'PermissionRelations',
        timestamps: false,
        tableName: 'permission_relations',
        scopes: {}
});