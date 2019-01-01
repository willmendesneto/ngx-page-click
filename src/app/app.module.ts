import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxPageClickModule } from '../../projects/ngx-page-click/src/lib/ngx-page-click.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxPageClickModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
