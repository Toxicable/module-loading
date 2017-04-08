import { NgModule, Component } from '@angular/core';
import { CommonModule} from '@angular/common'
@NgModule({
  declarations: [ LazyComp ],
  imports: [ CommonModule ],
  exports: [ LazyComp ],
  entryComponents: [ LazyComp ]
})
export class Lazy{}


@Component({
  selector: 'lazy-comp',
  template: 'hi'
})
export class LazyComp{
  constructor(){
    console.log('lazy')
  }
}
