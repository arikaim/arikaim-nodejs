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

class View {
   
    #viewPath = '';
    #templatesPath = '';
    #componentsPath = '';

    constructor() {
        this.#viewPath = Path.viewPath;      
        this.#templatesPath = Path.templatesPath;
        this.#componentsPath = Path.componentsPath;   
    }

    boot() {
        writeLn('Init template...');

    }
    
    renderComponent(name,language,params,type,mode) {
        
    }

    renderPage(name,language,params) {
        
    }

    static getInstance() {
        global.view = (global.view === undefined) ? new View() : global.view;     
        return global.view;  
    }
}

export default View.getInstance();