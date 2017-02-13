import { LazyComp } from './../plugins/lazy.module';
import { Component, Injector, NgModuleFactory, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

declare let System: any;

@Component({
  selector: 'dynamic-loader',
  template: ''
})
export class DynamicLoader {
  constructor(
    private injector: Injector,
    private viewRef: ViewContainerRef,
  ) {
    const plugin = {
      name: 'Lazy',
      path: '../plugins/lazy.module.ngfactory.ts'
    }
    System.import('../plugins/lazy.module.ngfactory.ts').then((componentFactories: any) => {
      const compType = componentFactories.LazyCompNgFactory._componentType
      const factory: NgModuleFactory<any> = componentFactories[plugin.name + 'NgFactory'];
      const moduleRef = factory.create(injector);
      const comp: ComponentFactoryResolver = moduleRef.componentFactoryResolver;
      const compFactory = comp.resolveComponentFactory(compType);
      viewRef.createComponent(compFactory);
    });
  }
}
