import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InvoiceModule } from './invoice/invoice.module';
import { HeaderComponent } from './_shared/Header/Header.component';
import { FooterComponent } from './_shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,FormsModule,
    AppRoutingModule , HttpClientModule,InvoiceModule ,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
