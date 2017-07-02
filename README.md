# module-loading

This repo has 2 examples of how to dynamically load Modules in Angular

## Static
This shows how you can load in a module similar to how `@angular/router` does.  
Here we require the module to be known at build time.  
Do note that it also makes use of a private API on this line 
```
const compType = moduleFactories['LazyCompNgFactory']._componentType;
````
Noted by the `_`, do not use this API unless you want to risk it being broken in the future since private API's are not subject to any of Angular's policies on breaking changes.  
This is mainly for comparison to the more dynamic way.

## Dynamic
This is the main feature of this repository.  
Here the plugin (Angular module) does not need to be known at build time for the main application to be built.  
With this method you can make plugins independantly of the main application.  
This is accomplished through the use of Webpack and Rollup and externalising dependencies.  
However, the issue with doing this is that all your dependencies must be loaded in as UMD bundles, which means that you loose all global optimisations. Meaning that you wont be able to do tree shaking or similar optimisations.

If you have any questions feel free to make an issue or ping on on [Gitter](https://gitter.im/angular/angular) with `@Toxicable`
