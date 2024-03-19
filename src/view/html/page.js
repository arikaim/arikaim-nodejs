'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Component from '@arikaim/arikaim-server/view/html/component/component.js'
import loadPropertiesFile from '@arikaim/arikaim-server/view/html/traits/properties.js'

export default class Page extends Component {

    constructor(
        name,
        basePath, 
        language,        
        viewPath,
        primaryTemplate,
        type
    ) {
        super(name,'pages',language,viewPath,primaryTemplate,'page');
    }

    init() {
        super.init();

        this.loadPropertiesFile(); 
    } 

    render(params = []) {
    }
}

applyTrait(Page,loadPropertiesFile,'loadPropertiesFile');
