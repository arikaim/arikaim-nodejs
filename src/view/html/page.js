'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import { PageHead } from '@arikaim/server/view/html/page-head.js'
import Component from '@arikaim/server/view/html/component/component.js'
import { loadPropertiesFile } from '@arikaim/server/view/html/traits/properties.js'

export default class Page extends Component {

    #head;

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
        this.#head = new PageHead(this.templatePath(true));
    } 

    get head() {
        return this.#head;
    }

    render(params) {
    }
}

applyTrait(Page,loadPropertiesFile,'loadPropertiesFile');
