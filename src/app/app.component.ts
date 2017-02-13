import { Component, NgModuleFactoryLoader, Compiler, Injector, NgModuleFactory, ComponentFactoryResolver


} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {of } from 'rxjs/observable/of';
import {map} from 'rxjs/operator/map';
import {mergeMap} from 'rxjs/operator/mergeMap';

 import {Route, LoadChildren } from '@angular/router';
import { LazyComp} from './lazy.module'
// export const ROUTES = new InjectionToken<Route[][]>('ROUTES');

// export class LoadedRouterConfig {
//   constructor(
//       public routes: Route[], public injector: Injector,
//       public factoryResolver: ComponentFactoryResolver, public injectorFactory: Function) {}
// }

declare let System: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(
    injector: Injector,
    compResolver: ComponentFactoryResolver
  ){
   // t.load('./src/app/lazy.module.ts#LazyModule').then(a => console.log(a))

  let exportName = 'AppComponent';
   System.import('./lazy.module.ngfactory.ts').then((a: any) => {
     compResolver.resolveComponentFactory(LazyComp);
   });
  }

//  constructor(private loader: NgModuleFactoryLoader, private compiler: Compiler) {}

//   load(parentInjector: Injector, loadChildren: LoadChildren): Observable<LoadedRouterConfig> {
//     return map.call(this.loadModuleFactory(loadChildren), (r: NgModuleFactory<any>) => {
//       const ref = r.create(parentInjector);
//       const injectorFactory = (parent: Injector) => r.create(parent).injector;
//       return new LoadedRouterConfig(
//           flatten(ref.injector.get(ROUTES)), ref.injector, ref.componentFactoryResolver,
//           injectorFactory);
//     });
//   }

//   private loadModuleFactory(loadChildren: LoadChildren): Observable<NgModuleFactory<any>> {
//     if (typeof loadChildren === 'string') {
//       return fromPromise(this.loader.load(loadChildren));
//     } else {
//       const offlineMode = this.compiler instanceof Compiler;
//       return mergeMap.call(
//           wrapIntoObservable(loadChildren()),
//           (t: any) => offlineMode ? of (<any>t) : fromPromise(this.compiler.compileModuleAsync(t)));
//     }
//   }
}
