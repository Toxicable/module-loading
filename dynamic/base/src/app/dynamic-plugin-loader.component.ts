import { Component, Injector, ViewContainerRef, NgModuleFactory, Input, ComponentFactory } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dynamic-component-loader',
  template: ''
})
export class DynamicComponentLoader {

  @Input() name: string;
  @Input() componentName: string;

  constructor(
    private injector: Injector,
    private viewRef: ViewContainerRef,
    private http: Http,
  ) { }


  ngOnInit() {
    const metadataPathSuffix = '.plugin-metadata.json';
    const factoryPathSuffix = 'plugin-factory.umd.js';
    const pluginUrlPrefix = 'assets/plugins';
    const factorySuffix = 'NgFactory';

    // retrieved the metadata for the plugin
    this.http.get(`${pluginUrlPrefix}/${this.name}/${metadataPathSuffix}`)
      .map(res => res.json())
      .map((metadata: PluginMetadata) => {

        // create the element to load in the factories
        const script = document.createElement('script');
        script.src = `${pluginUrlPrefix}/${this.name}/${factoryPathSuffix}`;

        script.onload = () => {
          const moduleFactory: NgModuleFactory<any> = window[metadata.name][metadata.moduleName + factorySuffix];
          const moduleRef = moduleFactory.create(this.injector);
          const factories: Map<Function, ComponentFactory<any>> = moduleRef.componentFactoryResolver['_factories'];

          const compFactory = Array.from(factories.values())
            .find(comp => comp.componentType.name === this.componentName);
          this.viewRef.createComponent(compFactory);
        }

        document.head.appendChild(script);

      }).subscribe();
  }
}

export interface PluginMetadata {
  moduleName: string;
  name: string;
}
