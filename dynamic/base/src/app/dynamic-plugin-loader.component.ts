import { PluginMetadata } from './plugin-metadata.model';
import { Component, Injector, ViewContainerRef, NgModuleFactory, Input, ComponentFactory } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dynamic-component-loader',
  template: ' '
})
export class DynamicComponentLoader {

  @Input() name: string;

  constructor(
    private injector: Injector,
    private viewRef: ViewContainerRef,
    private http: Http,
  ) { }


  ngOnInit() {
    const metadataFileName = 'plugin-metadata.json';
    const factoryFileName = 'plugin-factory.umd.js';
    const pluginUrlPrefix = 'assets/plugins';
    const factorySuffix = 'NgFactory';
    const pluginEntryPointToken = 'PLUGIN_ENTRY_POINT'

    // retrieved the metadata for the plugin
    this.http.get(`${pluginUrlPrefix}/${this.name}/${metadataFileName}`)
      .map(res => res.json())
      .map((metadata: PluginMetadata) => {

        // create the element to load in the module and factories
        const script = document.createElement('script');
        script.src = `${pluginUrlPrefix}/${this.name}/${factoryFileName}`;

        script.onload = () => {
          //rollup builds the bundle so it's attached to the window object when loaded in
          const moduleFactory: NgModuleFactory<any> = window[metadata.name][metadata.moduleName + factorySuffix];
          const moduleRef = moduleFactory.create(this.injector);

          //use the entry point token to grab the component type that we should be rendering
          const compType = moduleRef.injector.get(pluginEntryPointToken);
          const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(compType);

          this.viewRef.createComponent(compFactory);
        }

        document.head.appendChild(script);

      }).subscribe();
  }
}
