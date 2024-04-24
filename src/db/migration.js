'use strict';
/**
 * Arikaim Server
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c) Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Model from '@arikaim/server/db/model.js';

export default class Migration {
    #model;
    #sequelize;

    constructor(model, sequelize) {
        this.#model = model;
        this.#sequelize = sequelize;
    }

    static createFormFile(modelFile, sequelize) {
        var dbModel = Model.createFromFile(modelFile);
       
        return new Migration(dbModel,sequelize);
    }

    static create(modelName, serviceName, sequelize) {
        var dbModel = Model.create(modelName,serviceName);
       
        return new Migration(dbModel,sequelize);
    }

    async up() {
        await this.resolveModel();

        var tableName = this.#model.getTableName();
        var attr = this.#model.getAttributes();
        this.#sequelize.getQueryInterface().createTable(tableName,attr);
    }

    async update() {
    }

    async down() {
        awaitthis.resolveModel();
        
        var tableName = this.#model.getTableName();       
        this.#sequelize.getQueryInterface().dropTable(tableName);
    }

    get queryInterface() {
        return this.#sequelize.getQueryInterface();
    }

    get tableName() {
        resolveModel();
        return this.#model.getTableName();
    }

    async resolveModel() {
        this.#model = await this.#model.then(function(obj) {
            return obj
        }).catch(function(error) {
            return null;
        }); 
    }
}
