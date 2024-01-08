'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Path from '@arikaim/arikaim-services/system/path.js';
import Component from 'html/component/component.js'

class View {
   
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

    renderPage(name,language,params) {
        
    }

    static getInstance() {
        global.view = (global.view === undefined) ? new View() : global.view;     
        return global.view;  
    }
}

export default View.getInstance();