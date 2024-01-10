'use strict';

import ArikaimService from "@arikaim/arikaim/service.js"


export default class CoreApiService extends ArikaimService {

    boot() { 
        this.router.get('/',async (req, res) => {
            console.log('res');
           // var html = view.renderPage('home',{});

           // console.log(html);
            res.renderPage('current>home',{});
         
        });
    }
}