import { Component, Injector, ViewContainerRef, NgModuleFactory, Input, ComponentFactory } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map'
@Component({
  selector: 'dynamic-component-loader',
  template: ''
})
export class DynamicComponentLoader {

  constructor(
    private injector: Injector,
    private viewRef: ViewContainerRef,
    private http: Http,
  ) { }

  @Input() name: string;
  @Input() componentName: string;

  ngOnInit() {
    const metadataPathSuffix = '.plugin-metadata.json';
    const factoryPathSuffix = 'plugin-factory.umd.js';
    const pluginUrlPrefix = 'assets/plugins';
    const factorySuffix = 'NgFactory';

    this.http.get(`${pluginUrlPrefix}/${this.name}/${metadataPathSuffix}`)
      .map(res => res.json())
      .map((metadata: PluginMetadata) => {

        const script = document.createElement('script');
        script.src = `${pluginUrlPrefix}/${this.name}/${factoryPathSuffix}`;

        script.onload = () => {
          const moduleFactory: NgModuleFactory<any> = window[metadata.name][metadata.moduleName + factorySuffix];
          const moduleRef = moduleFactory.create(this.injector);
          const factories: Map<any, any> = moduleRef.componentFactoryResolver['_factories'];

          factories.forEach((factory: ComponentFactory<any>) => {
            if (factory.componentType.name === this.componentName) {
              this.viewRef.createComponent(factory);
            }
          })
        }

        document.head.appendChild(script);

      }).subscribe();
  }
}

export interface PluginMetadata {
  moduleName: string;
  name: string;
}
