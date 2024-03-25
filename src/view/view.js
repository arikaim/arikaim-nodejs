'use strict';
/**
 * Arikaim
 *
 * @link        http://www.arikaim.com
 * @copyright   Copyright (c)  Intersoft Ltd <info@arikaim.com>
 * @license     http://www.arikaim.com/license.html
 * 
*/

import Path from '@arikaim/arikaim/common/path.js';
import { File } from '@arikaim/arikaim/common/file.js';
import ArikaimPackage from '@arikaim/arikaim/common/package.js';
import Component from '@arikaim/arikaim-server/view/html/component/component.js';
import SvgComponent from '@arikaim/arikaim-server/view/html/component/svg-component.js';
import ArikaimComponent from '@arikaim/arikaim-server/view/html/component/arikaim-component.js';
import Page from '@arikaim/arikaim-server/view/html/page.js';
import TemplateExtension from '@arikaim/arikaim-server/view/template/extension.js';
import ComponentTag from '@arikaim/arikaim-server/view/template/tags/component.js';

import nunjucks from 'nunjucks';

export default class View {
   
    #COMPONENTS_CLASSES = {
        page: Page,
        base: Component,
        svg: SvgComponent,
        arikaim: ArikaimComponent
    };

    #viewPath = '';
    #templatesPath = '';
    #componentsPath = '';
    #primaryTemplate = null;
    #themeVars = {};
    #templateDescriptor = {};

    constructor(primaryTemplate) {
        this.#viewPath = Path.viewPath;      
        this.#templatesPath = Path.templatesPath;
        this.#componentsPath = Path.componentsPath; 
        this.#primaryTemplate = primaryTemplate; 
    }

    boot() {
        writeLn('Init template...');
      
        const env = nunjucks.configure([
            this.#componentsPath,
            this.#templatesPath,
            this.getPagesPath()
        ],{
            autoescape: false 
        });

        this.#templateDescriptor = ArikaimPackage.loadPackageDescriptor(this.#primaryTemplate,'template');
        // load theme globals file 
        this.loadThemeVars();
        // create template incude files code
        this.resolveTemplateIncludes();
    
        // add funcitons 
        env.addGlobal('component',this.renderComponent.bind(this));
        env.addExtension('component',new ComponentTag());
        env.addGlobal('theme',this.#themeVars);
    }
    
    get templateDescriptor() {
        return this.#templateDescriptor;
    }

    loadThemeVars() {
        var fileName = Path.templatePath(this.#primaryTemplate) + 'themes' + Path.sep + 'default.json';               
        try {
            this.#themeVars = File.readJSONFile(fileName);  
        } catch (error) {
            writeLn(error);
        }
    } 

    createComponent(name,type,language) {
        type = type ?? 'arikaim';
        var component = new this.#COMPONENTS_CLASSES[type](
            name,
            'components',   
            language,                  
            this.#viewPath,
            this.#primaryTemplate,
            type
        );

        component.init();

        return component;
    }

    renderComponent(name,params,type,language) {
        if (isEmpty(name) == true) {
            return '';
        }
        console.log('render comp: ' + name);

        console.log(url.host);

        var component = this.createComponent(name,type,language);
        component.resolve(params);
    
        var htmlCode = '';
        if (component.hasContent() == true) {
            // render template code
            try {
                htmlCode = nunjucks.render(component.templateFile,component.context);          
            } catch (error) {
                errorMessage(error);
                htmlCode = '';
            }
        }

        return htmlCode;
    }

    renderPage(name,params,language) {
        const page = this.createComponent(name,'page',language);
        page.resolve(params);

        var body = nunjucks.render(page.templateFile,page.context);
        page.head.mergeContent(page.context.head)

        return nunjucks.render('index.html',{
            language: language,
            body: body,
            head: page.head.context
        }); 
    }

    resolveTemplateIncludes() {
        if (isEmpty(this.templateDescriptor) == true) {
            return false;
        }

        this.resolveLibraryIncludes();
    }

    resolveLibraryIncludes() {

        console.log(this.templateDescriptor.include);
       // items.forEach(item => {
       //     var tokens = item.split(':');

      //  });
    }

    getLibraryProperties(name, version) {
        var data = ArikaimPackage.loadPackageDescriptor(this.#primaryTemplate,'template');
        if (data == null) {
            return null;
        }

        if (isEmpty(version) == true) {
            return data;
        }

        if (data['versions'][version]['files'] !== 'undefined') {
            data['files'] = data['versions'][version]['files'];
        }
        
        return data;
    }
    
    getLibraryFiles(libraryName, vaersion) {
        var properties = this.getLibraryProperties(libraryName,version);
        var files = {};
        if (properties == null) {
            return files;
        }

        properties['files'].forEach(file => {
            console.log(file);
        });
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
