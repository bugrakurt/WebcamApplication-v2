import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebcamModule } from 'ngx-webcam';

import { AppComponent } from './app.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
