'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Path from '@arikaim/arikaim/system/path.js';
import Component from '@arikaim/arikaim/view/html/component/component.js';
import Page from '@arikaim/arikaim/view/html/page.js';
import TemplateExtension from '@arikaim/arikaim/view/template/extension.js';

const nunjucks = require('nunjucks');

export default class View {
   
    #COMPONENTS_CLASSES = {
        page: Page,
        base: Component
    };

    #viewPath = '';
    #templatesPath = '';
    #componentsPath = '';
    #primaryTemplate = null;

    constructor(primaryTemplate) {
        this.#viewPath = Path.viewPath;      
        this.#templatesPath = Path.templatesPath;
        this.#componentsPath = Path.componentsPath; 
        this.#primaryTemplate = primaryTemplate; 
    }

    boot() {
        writeLn('Init template...');
      
        const env = nunjucks.configure([
            this.#templatesPath,
            this.getPagesPath()
        ],{
            autoescape: false 
        });

        // add funcitons 
        env.addGlobal('component',this.renderComponent.bind(this));
    }
    
    createComponent(name, language, type) {
        type = type ?? 'base';
        var component = new this.#COMPONENTS_CLASSES[type](
            name,
            'components',   
            language,                  
            this.#viewPath,
            this.#primaryTemplate,
            type
        );

        component.init();

        return component;
    }

    renderComponent(name,params,language,type) {
        var component = this.createComponent(name,language,type);
        component.resolve(params);

        var htmlCode = '';
        if (component.hasContent() == true) {
            // render template code
            htmlCode = nunjucks.render(component.templateFile,component.context);          
        }

        return htmlCode;
    }

    renderPage(name,params,language) {
        const page = this.createComponent(name,language,'page');
        page.resolve(params);

        var body = nunjucks.render(page.templateFile,page.context);

        return nunjucks.render('index.html',{
            language: language,
            body: body
        }); 
    }

    getIndexFile() {
        return this.getPagesPath() + 'index.html';
    }

    getPagesPath() {
        return Path.templatesPath + this.#primaryTemplate + Path.sep + 'pages' + Path.sep;
    }

    getPagePath(name) {
        return this.getPagesPath() + name + Path.sep;
    }

    static create(primaryTemplate) {
        if (global.view === undefined) {
            global.view = new View(primaryTemplate);
            global.view.boot();
        }
      
        return global.view;  
    }
}
