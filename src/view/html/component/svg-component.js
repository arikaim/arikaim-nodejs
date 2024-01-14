'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Component from '@arikaim/arikaim/view/html/component/component.js';

export default class SvgComponent extends Component{

    constructor(
        name,
        basePath, 
        language,        
        viewPath,
        primaryTemplate,
        type
    ) {
        super(name,'components',language,viewPath,primaryTemplate,'svg');

        
    }

    init() {
        super.init();

        this.mergeContext({
            width: '1',
            fill: 'none',
            stroke: 'currentColor'
        });
    } 
}