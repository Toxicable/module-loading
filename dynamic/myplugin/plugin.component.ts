import { Component } from '@angular/core';

@Component({
  selector: 'myplugin',
  template: `
    I am a plugin!

    `
})
export class PluginComponent {
  ngOnInit() {
    console.log('HELLO hey WORLD')
  }
}
