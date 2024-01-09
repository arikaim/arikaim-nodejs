'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import Twig from 'twig';

import Path from '@arikaim/arikaim-services/system/path.js';
import Component from '@arikaim/arikaim-services/view/html/component/component.js'

const nunjucks = require('nunjucks')

export default class View {
   
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
        nunjucks.configure(this.getPagesPath());
    }
    
    createComponent(name, language, type, renderMode) {             
        var component = new Component(
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

    renderComponent(name,language,params,type,renderMode) {
        var component = this.createComponent(name,language,type,renderMode);
        component.resolve(params);

        if (component.hasContent() == true) {
            // render template code
            component.setHtmlCode('');  
        }

        return component;
    }

    renderPage(name,params,onComplete) {
       
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
