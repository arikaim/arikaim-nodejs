'use strict';

import ArikaimService from "@arikaim/arikaim/service.js"


export default class CoreApiService extends ArikaimService {

    boot() { 
        this.router.get('/',async (req, res) => {
          
            res.renderPage('current>home',{});         
        });
    }
}