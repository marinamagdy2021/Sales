import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetInvoiceComponent } from './get-invoice/get-invoice.component';
import { FormsModule } from '@angular/forms';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';



@NgModule({
  declarations: [
    GetInvoiceComponent,
    AddInvoiceComponent
  ],
  imports: [ 
    CommonModule, FormsModule
  ],
  exports: [
    GetInvoiceComponent
  ],
})
export class InvoiceModule { }
