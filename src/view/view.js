'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

class View {
   

    constructor() {
       
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