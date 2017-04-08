import { Component, Injector, NgModuleFactory, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private injector: Injector,
    private viewRef: ViewContainerRef
  ) { }

  ngOnInit() {
    let script = document.createElement('script');
    script.src = 'assets/module.js';

    script.onload = () => {
      debugger
      const moduleFactory: NgModuleFactory<any> = window['plugin-module']['PluginModuleNgFactory'];
      const moduleRef = moduleFactory.create(this.injector);
      const componentFactoryResolver = moduleRef.componentFactoryResolver;
      const factories: Map<any, any> = componentFactoryResolver['_factories'];
      const keys = factories.keys();
      const compType = keys.next().value
      const compFactory = componentFactoryResolver.resolveComponentFactory(compType);
      this.viewRef.createComponent(compFactory);
    }

    document.head.appendChild(script);

  }
}
