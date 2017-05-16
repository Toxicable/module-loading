import { LazyComp } from './../plugins/lazy.module';
import {
  Component, Injector, NgModuleFactory,
  ComponentFactoryResolver, ViewContainerRef,
  Input
} from '@angular/core';

declare let System: any;
const FACTORY_SUFFIX = 'NgFactory';

@Component({
  selector: 'dynamic-loader',
  template: ''
})
export class DynamicComponentLoader {

  @Input() componentName: string
  @Input() moduleName: string;
  @Input() moduleFactoryPath: string

  constructor(
    private injector: Injector,
    private viewRef: ViewContainerRef,
  ) {

    System.import('./lazy.module.ngfactory.ts').then((moduleFactories: any) => {
      const compType = moduleFactories['LazyCompNgFactory']._componentType;
      const moduleFactory: NgModuleFactory<any> = moduleFactories['LazyModuleNgFactory'];
      const moduleRef = moduleFactory.create(injector);
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(compType);
      viewRef.createComponent(compFactory);
    });
  }
}
