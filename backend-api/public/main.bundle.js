webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-resourceform>\n  \n</app-resourceform>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_resourceform_resourceform_component__ = __webpack_require__("../../../../../src/app/components/resourceform/resourceform.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["P" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__components_resourceform_resourceform_component__["a" /* ResourceformComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/resourceform/resourceform.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/resourceform/resourceform.component.html":
/***/ (function(module, exports) {

module.exports = "<body class=\"bg-light\" style=\"height: -webkit-fill-available;\">\n  <div class=\"container\">\n    <div class=\"py-4 text-center\">\n      <h2>Mapping Resources Types</h2>\n      <p class=\"lead\">Generate Resources & asociating their ResourceType</p>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-4 order-md-2 mb-4\">\n        <h4 class=\"d-flex justify-content-between align-items-center mb-3\">\n          <span class=\"text-muted\">Resources Types</span>\n          <span class=\"badge badge-secondary badge-pill\">{{restypes.length}}</span>\n        </h4>\n        <div data-spy=\"scroll\" data-target=\"#navbar-example2\" data-offset=\"0\" style=\"position: relative;height: 275px;overflow-y: scroll;\">\n            <ul class=\"list-group mb-3\" style=\"margin-bottom:0px!important;\">\n                <li *ngFor=\"let restype of restypes\" class=\"list-group-item d-flex justify-content-between lh-condensed\">\n                    <div>\n                      <h6 class=\"my-0\">{{restype.restype_displayname}}</h6>\n                      <small class=\"text-muted\">Name: {{restype.restype_name}}, <samp class=\"badge-info badge-pill\">id:{{restype.restype_id}}</samp> </small><br>\n                      <small class=\"text-muted\">{{restype.restype_description}}</small><br>\n                      Actions: \n                       <small *ngFor=\"let attr of restype.restype_actions\" class=\"badge badge-secondary badge-pill\" >{{attr.restype_action_name}}</small> \n                       <small class=\"badge badge-danger badge-pill\" style=\"font-size: xx-small;\">_id:{{restype._id}}</small>\n                    </div>\n                </li> \n              </ul>  \n            </div>   \n\n      </div>\n      <div class=\"col-md-8 order-md-1\">\n        <h4 class=\"mb-3\">Generate Resource</h4>\n        <hr class=\"mb-4\">\n        <form class=\"needs-validation\" (submit)=\"onGenerateResource()\" >\n          <div class=\"row\">\n            <div class=\"col-md-6 mb-3\">\n\n              <input type=\"text\" id=\"res_name\" class=\"form-control form-control-lg\" [(ngModel)]=\"res_name\" name=\"res_name\" placeholder=\"Resource name\" required>\n\n            </div>\n            <div class=\"col-md-6 mb-3\">\n\n              <input type=\"text\" id=\"res_displayname\" class=\"form-control form-control-lg\" [(ngModel)]=\"res_displayname\" name=\"res_displayname\" placeholder=\"Resource Display name\" required >\n            \n            </div>\n          </div>\n\n          <div class=\"mb-2\">\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\" style=\"margin-bottom: 1rem;\">Select Resource Type:</span>\n              </div>\n              <select class=\"custom-select mb-3\" [(ngModel)]=\"restype_id\" name=\"restype_id\" required >\n\n                <option *ngFor=\"let restype of restypes\" value=\"{{restype._id}}\">{{restype.restype_displayname}}</option>\n\n              </select>\n            </div>\n          </div>\n\n          <div class=\"mb-3\">\n            <div class=\"input-group\">\n              <div class=\"input-group-prepend\">\n                <span class=\"input-group-text\">Resource Description:</span>\n              </div>\n\n              <textarea id=\"res_description\" class=\"form-control\" [(ngModel)]=\"res_description\" name=\"res_desc\" rows=\"1\" required ></textarea>\n\n              <div class=\"invalid-feedback\" style=\"width: 100%;\">\n                All Resource Fields is required.\n              </div>\n            </div>\n          </div>\n\n          <hr class=\"mb-4\">\n\n          <button class=\"btn btn-primary btn-lg btn-block\" id=\"submit-btn\" type=\"submit\">Generate Resource</button>\n\n          <div  id=\"update-btn\" >\n            <button class=\"btn btn-primary btn-lg\" (click)=\"OnUpdateResource(eid)\" type=\"button\" >Update Resource</button>\n            <button class=\"btn btn-danger btn-lg\"  (click)=\"OnCancel()\" type=\"button\">Cancel</button>\n          </div>\n\n        </form>\n      </div>\n    </div>\n\n    <hr class=\"mb-4\">\n\n<h4 class=\"d-flex justify-content-between align-items-center mb-3\">\n          <span class=\"text-muted\">Generated Resources </span>\n          <span class=\"badge badge-secondary badge-pill\">{{resos.length}}</span>\n        </h4>\n    <div class=\"row\" >\n      \n        <div class=\"col\" style=\"display:inline-flex;\">\n            <div data-spy=\"scroll\" data-target=\"#list-example\" data-offset=\"0\" class=\"scrollspy-example\" style=\"position: relative;height: 190px;width:100%;overflow-y: scroll;padding:20px;background-color:white;\">\n              <div class=\"list-group-item\" *ngFor=\"let reso of resos\" id=\"{{reso._id}}\" >\n                  <p class=\"d-flex justify-content-between align-items-center mb-2\" >\n                    <kbd>{{reso.res_displayname}} <span class=\"text-warning\"> name: {{reso.res_name}}</span> </kbd><small class=\"badge badge-info badge-pill\">id: {{reso._id}}</small>\n                  </p>\n                  <span class=\"text-muted\">{{reso.res_description}}</span>\n                  <span class=\"badge badge-pill\">Resource Type Id: {{reso.restype_id}}</span>\n                  <button type=\"button\" (click)=\"OnDelResource(reso._id)\" class=\"close btn-sm\" aria-label=\"Close\" style=\"float:right;\">\n                      <i class=\"fas fa-trash-alt\"></i>\n                  </button>\n                  <button type=\"button\" (click)=\"OnEditResource(reso._id)\" class=\"close btn-sm\" aria-label=\"Edit\" style=\"float:right;\">\n                    <i class=\"fas fa-edit\"></i> &nbsp;&nbsp;\n                  </button>\n                  <br>\n              </div>  \n            </div>\n        </div>\n      </div>\n      \n  </div>\n</body>\n"

/***/ }),

/***/ "../../../../../src/app/components/resourceform/resourceform.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceformComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResourceformComponent = (function () {
    function ResourceformComponent(_http) {
        this._http = _http;
        this._options = { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' }) };
        this.restypes = [];
        this.resos = [];
        this.loadResourceTypes();
        this.loadGeneratedResources();
    }
    ResourceformComponent.prototype.ngOnInit = function () {
        document.getElementById('update-btn').style.display = 'none';
    };
    ResourceformComponent.prototype.loadResourceTypes = function () {
        var _this = this;
        this._http.get('/resources/res_types')
            .map(function (res) { return res.json(); })
            .subscribe(function (restypedata) { return _this.restypes = restypedata; }, function (err) { return console.log("error Occured while fetching Resource Type", err); });
    };
    ResourceformComponent.prototype.loadGeneratedResources = function () {
        var _this = this;
        this._http.get('/resources/generated_resources')
            .map(function (resp) { return resp.json(); })
            .subscribe(function (resdata) { return _this.resos = resdata; }, function (err) { return console.log("error Occured while fetching Resource Type", err); });
    };
    ResourceformComponent.prototype.onGenerateResource = function () {
        var _this = this;
        var resource = {
            restype_id: this.restype_id,
            res_name: this.res_name,
            res_displayname: this.res_displayname,
            res_description: this.res_description
        };
        if (resource.res_name == undefined || resource.res_displayname == undefined || resource.restype_id == undefined || resource.res_description == undefined) {
            return false;
        }
        else {
            this._http.post('/resources/addResource', JSON.stringify(resource), this._options)
                .subscribe(function (res) { if (res.status = 200) {
                alert('Resource Created sucessfully');
                _this.loadGeneratedResources();
            } }, function (err) { alert('Opps smthing went wrong !'); });
            this.restype_id = this.res_name = this.res_displayname = this.res_description = null;
        }
    };
    ResourceformComponent.prototype.OnEditResource = function (id) {
        var _this = this;
        if (id == undefined || id == null) {
            alert("opps smthing went wrong !");
        }
        else {
            this._http.get('/resources/ResourceById/?id=' + id)
                .subscribe(function (res) {
                if (res.status = 200) {
                    var eresobj = res.json();
                    _this.res_name = eresobj.res_name;
                    _this.res_displayname = eresobj.res_displayname;
                    _this.res_description = eresobj.res_description;
                    _this.restype_id = eresobj.restype_id;
                    _this.eid = eresobj._id;
                }
            }, function (err) { alert('Opps smthing went wrong !'); });
            document.getElementById('submit-btn').style.display = 'none';
            document.getElementById('update-btn').style.display = 'block';
        }
    };
    ResourceformComponent.prototype.OnUpdateResource = function (id) {
        var _this = this;
        var editedresource = {
            _id: this.eid,
            restype_id: this.restype_id,
            res_name: this.res_name,
            res_displayname: this.res_displayname,
            res_description: this.res_description
        };
        if (editedresource.res_name == undefined || editedresource.res_displayname == undefined || editedresource.restype_id == undefined || editedresource.res_description == undefined) {
            return false;
        }
        else {
            this._http.put('/resources/updateResource', editedresource, this._options)
                .subscribe(function (res) { if (res.status = 200) {
                alert('Resource updated sucessfully');
                _this.loadGeneratedResources();
            } }, function (err) { alert('Opps smthing went wrong !'); });
        }
    };
    ResourceformComponent.prototype.OnCancel = function () {
        this.restype_id = this.res_name = this.res_displayname = this.res_description = this.eid = null;
        document.getElementById('submit-btn').style.display = 'block';
        document.getElementById('update-btn').style.display = 'none';
    };
    ResourceformComponent.prototype.OnDelResource = function (id) {
        var _this = this;
        var data = { "id": "" + id };
        var _deloptions = { headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' }), body: data };
        if (id == undefined || id == null) {
            alert("opps smthing went wrong !");
        }
        else {
            this._http.delete('/resources/delResource', _deloptions)
                .subscribe(function (res) { if (res.status = 200) {
                alert('Resource Deleted sucessfully');
                _this.loadGeneratedResources();
            } }, function (err) { alert('Opps smthing went wrong !'); });
        }
    };
    ResourceformComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Component */])({
            selector: 'app-resourceform',
            template: __webpack_require__("../../../../../src/app/components/resourceform/resourceform.component.html"),
            styles: [__webpack_require__("../../../../../src/app/components/resourceform/resourceform.component.css")]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], ResourceformComponent);
    return ResourceformComponent;
    var _a;
}());
//# sourceMappingURL=resourceform.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map