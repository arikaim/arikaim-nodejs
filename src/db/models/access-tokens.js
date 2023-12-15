'use strict';
/**
 * Arikaim Services
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Konstantin Atanasov <info@arikaim.com>
 * @license     http://www.arikaim.com/license
*/

import { DataTypes, Model } from 'sequelize';

export default class AccessTokens extends Model {
}

AccessTokens.init({
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{ 
    sequelize,
    modelName: 'AccessTokens',
    timestamps: false,
    tableName: 'access_tokens'
});
