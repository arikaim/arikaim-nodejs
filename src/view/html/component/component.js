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
const merge = require('deepmerge');

export default class Component {

    static NAME_SEPARATORS() {
        var sep = {};
        sep['~'] = 3;
        sep[':'] = 1; // template component
        sep['>'] = 4; // primary template

        return sep;   
    } 

    #id = null;
    #name = '';
    #fullName = '';
    #templateName = '';
    #templateUrl = '';
    #path = '';
    #fullPath = '';
    #filePath = '';
    #language = '';
    #htmlCode = '';
    #error = null;
    #basePath = '';
    #files = {};
    #location;
    #type;
    #viewPath;
    #primaryTemplate;
    #renderMode = 'view';
    #htmlFileName = '';
    #context = {}

    constructor(
        name,
        basePath, 
        language,        
        viewPath,
        primaryTemplate,
        type
    ) {
        this.#fullName = name;
        this.#language = language;      
        this.#basePath = basePath;
        this.#viewPath = viewPath; 

        this.#primaryTemplate = primaryTemplate;
        this.#type = type;

        this.#files = {
            js: [],
            css: []           
        };
        this.#renderMode = 'view';  
    }

    init() {
        this.parseName(this.#fullName);
        this.resolvePath(); 

        // init context
       
    } 

    resolve(params) {
        // resolve id 
        params = (isObject(params) == false) ? {} : params;
        this.#id = params['component_id'] ?? params['id'] ?? this.#id;
        this.#context['component_id'] = this.#id; 
        
        this.#context = merge(this.#context,params);  
    }

    hasContent() {
        return true;
    }

    parseName(name) {
        const separators = Component.NAME_SEPARATORS();
        var tokens;
        var nameSplit = name.split('/');  
        name = nameSplit[0];
        
        for (const key in separators) {
            tokens = name.split(key);         
            if (isEmpty(tokens[1]) == false) {
                this.#location = separators[key];               
                break;
            }    
        }

        console.log(tokens[0]);

        this.#id = tokens[1].replace('.','-');
        this.#path = tokens[1].replace('.','/');
        this.#templateName = tokens[0];          
               
        this.#name = this.#path.split('/').slice(-1);
        this.#htmlFileName = (isEmpty(nameSplit[1]) == false) ? nameSplit[1] + '.html' : this.#name + '.html';

        if (this.#location == 4) {
            this.#location = 1; // template 
            this.#templateName = this.#primaryTemplate;           
        }

        console.log(this.#primaryTemplate);
        console.log(this.#templateName);
        console.log(this.#location);
        console.log(this.#id);
        console.log(this.#path);
        console.log(this.#basePath);

        this.#fullPath = Path.templatePath(this.#templateName) + this.#basePath + Path.sep + this.#path + Path.sep;
        this.#filePath = this.#templateName + Path.sep + this.#basePath + Path.sep + this.#path + Path.sep;
    }

    resolvePath() {       
        
    }

    get fullPath() {
        return this.#fullPath;
    }

    get context() {
        return this.#context;
    }

    get templateFile()
    {
        return this.#filePath + this.#htmlFileName;
    }

}