'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import merge from 'deepmerge';

const NEW_LINE = '\n \t \t';

export class PageHead { 
    #context;

    constructor() {
        this.#context = {
            html_code: ''
        }
    }

    mergeContent(params) {
        if (isObject(params) == true) {
            this.#context = merge(this.#context,params);  
        }
    }

    get context() {
        return this.#context;
    }

    get html_code() {
        return this.#context.html_code;
    }

    createCode(includes) {
        // css include files
        includes.css.forEach(item => {
            this.addCssFileLink('css/' + item);
        });
    }

    addCssFileLink(file) {
        this.#context.html_code += PageHead.linkCode({ file: file }) + NEW_LINE;
    }

    static linkCode(options) {
        return '<link media="all" href="' + options.file + '"  type="text/css" rel="stylesheet"/>';
    }
}
