import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetInvoiceComponent } from './get-invoice/get-invoice.component';
import { FormsModule } from '@angular/forms';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from 'primeng/sidebar';

@NgModule({
  declarations: [
    GetInvoiceComponent,
    AddInvoiceComponent,
  ],
  imports: [ 
    CommonModule, FormsModule,SidebarModule, ConfirmDialogModule , BrowserAnimationsModule,
  ],
  exports: [
    GetInvoiceComponent
  ],
})
export class InvoiceModule { }
