'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Twig from 'twig';

import Path from '@arikaim/arikaim/system/path.js';
import Component from '@arikaim/arikaim/view/html/component/component.js';
import Page from '@arikaim/arikaim/view/html/page.js';

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
        console.log(this.getPagesPath());

        nunjucks.configure([this.getPagesPath()]);
    }
    
    createComponent(name, language, type) {
        type = type ?? 'base';
       

        var component = new this.#COMPONENTS_CLASSES[type](
            name,
            language,       
            'components',   
            this.#viewPath,
            this.#primaryTemplate,
            type
        );

        component.init();

        return component;
    }

    renderComponent(name,params,language,type,renderMode) {
        var component = this.createComponent(name,language,type,renderMode);
        component.resolve(params);

        if (component.hasContent() == true) {
            // render template code
            component.setHtmlCode('');  
        }

        return component;
    }

    renderPage(name,params,language) {
        const page = this.createComponent(name,language,'page');
        page.resolve(params);

        var path = this.getPagePath(name);
        console.log(path);
        console.log(this.getIndexFile());


        return nunjucks.render('index.html',params);

        //await Twig.renderFile(this.getIndexFile(), params, (err, html) => {

        //    console.log(err);
       //     callFunction(onComplete,html);
       // });       
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
