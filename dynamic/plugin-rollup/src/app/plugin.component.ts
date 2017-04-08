import { Component } from '@angular/core';  

@Component({
    selector: 'lazy',
    template: 'hi'
})
export class PluginComponent{
    ngOnInit(){
        console.log('HELLO WORLD')
    }
}