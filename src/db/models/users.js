'use strict';
/**
 * Arikaim Server
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { DataTypes, Model } from 'sequelize';
import findById from './../query/find.js';

class Users extends Model {
    findById = findById;
}

export default Users.init({
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
        type: DataTypes.INTEGER
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{ 
    sequelize: sequelize,
    modelName: 'Users',
    timestamps: false,
    tableName: 'users',
    scopes: {
        active: {
            where: { status: 1 }
        }
    }
});
