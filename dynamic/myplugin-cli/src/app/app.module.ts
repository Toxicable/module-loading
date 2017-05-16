import { PluginComponent } from './plugin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    PluginComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [PluginComponent]
})
export class AppModule { }
