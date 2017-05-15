var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { PluginComponent } from './plugin.component';
import { NgModule, InjectionToken } from '@angular/core';
var LAZY_CMP = new InjectionToken('LAZY_CMP');
var PluginModule = (function () {
    function PluginModule() {
    }
    return PluginModule;
}());
PluginModule = __decorate([
    NgModule({}),
    NgModule({
        declarations: [
            PluginComponent
        ],
        entryComponents: [
            //makes sure a factory is created in the bundle for this component
            PluginComponent
        ],
        providers: [
            //so that the base knows what component to render
            { provide: 'PluginEntryPoint', useValue: PluginComponent }
        ]
    })
], PluginModule);
export { PluginModule };
//# sourceMappingURL=plugin.module.js.map