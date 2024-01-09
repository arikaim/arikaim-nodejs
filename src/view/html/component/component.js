'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/


export default class Component {

    static NAME_SEPARATORS() {
        var sep = {};
        sep['~'] = 3;
        sep[':'] = 1;
        sep['>'] = 4;

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
        //this.resolvePath(); 
    } 

    resolve(params) {
        // resolve id 
        this.#id = params['component_id'] ?? params['id'] ?? this.#id;
        this.#context['component_id'] = this.#id;       
    }

    hasContent() {
        return true;
    }

    parseName(name) {
        const separators = Component.NAME_SEPARATORS();
        var tokens;
        
        console.log(separators);

        var nameSplit = name.split('/');  
        name = nameSplit[0];
        
        for (const key in separators) {
            tokens = name.split(separators[key]) 
            if (isEmpty(tokens[1]) == false) {
                this.#location = value;
                break;
            }    
        }

       
    }

    resolveLocation(name) {

    }
}