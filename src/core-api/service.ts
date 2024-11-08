'use strict';

import ArikaimService from "@arikaim/server/service.js"
import arikaimServer from '@arikaim/server/server.js';

export default class CoreApiService extends ArikaimService {

    boot() { 
        if (isEmpty(view.templateDescriptor) == false) {
            this.loadTemplateRoutes();
        }
        // services server routes
        this.router.get('help/services',this.getServices());         
    }

    getServices() {
        return async (req, res) => {
            //res.renderPage('current>' + name,{});         
        };
    }

    loadTemplateRoutes() {
        logger.info('Load core api routes ...');

        view.templateDescriptor.routes.forEach(item => {
            this.router.get(item.path,this.loadPage(item.page));         
        });     
    }

    loadPage(name) {
        return async (req, res) => {
            res.renderPage('current>' + name,{});         
        };
    }
}