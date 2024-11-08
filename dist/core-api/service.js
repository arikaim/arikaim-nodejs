'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_js_1 = __importDefault(require("@arikaim/server/service.js"));
class CoreApiService extends service_js_1.default {
    boot() {
        if (isEmpty(view.templateDescriptor) == false) {
            this.loadTemplateRoutes();
        }
        // services server routes
        this.router.get('help/services', this.getServices());
    }
    getServices() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            //res.renderPage('current>' + name,{});         
        });
    }
    loadTemplateRoutes() {
        logger.info('Load core api routes ...');
        view.templateDescriptor.routes.forEach(item => {
            this.router.get(item.path, this.loadPage(item.page));
        });
    }
    loadPage(name) {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.renderPage('current>' + name, {});
        });
    }
}
exports.default = CoreApiService;
