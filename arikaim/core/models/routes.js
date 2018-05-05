'use strict';

const Model = include('core/models/model.js');

class Routes extends Model {
 
    define(sequelize) {
        this.model = sequelize.define('routes',{
            id:                     { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
            name:                   { type: Sequelize.STRING, allowNull: true, unique: true, defaultValue: null },
            pattern:                { type: Sequelize.STRING, allowNull: false },
            method:                 { type: Sequelize.STRING, allowNull: false },
            handler_class:          { type: Sequelize.STRING, allowNull: false },
            handler_method:         { type: Sequelize.STRING, allowNull: true, defaultValue: '' },
            status:                 { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
            uuid:                   { type: Sequelize.STRING, allowNull: false, unique: true },
            extension_name:         { type: Sequelize.STRING, allowNull: false },
            template_name:          { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
            template_page:          { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
            auth:                   { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
            required_permission:    { type: Sequelize.STRING, allowNull: true, defaultValue: null },
            permission_type:        { type: Sequelize.STRING, allowNull: true, defaultValue: null },
            type:                   { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
        });
    }
}

module.exports = Routes;