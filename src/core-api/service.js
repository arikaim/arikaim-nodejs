'use strict';

import ArikaimService from "@arikaim/arikaim-server/service.js"


export default class CoreApiService extends ArikaimService {

    boot() { 
        if (isEmpty(view.templateDescriptor) == false) {
            this.loadTemplateRoutes();
        }
        
    }

    loadTemplateRoutes() {
        writeLn('Load template page roues','green');

        view.templateDescriptor.routes.forEach(item => {
            writeLn('Asdd page route ' + item.path);
            this.router.get(item.path,this.loadPage(item.page));         
        });     
    }

    loadPage(name) {
        return async (req, res) => {
            res.renderPage('current>' + name,{});         
        };
    }
}