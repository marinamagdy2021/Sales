import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { GetInvoiceComponent } from './invoice/get-invoice/get-invoice.component';
import { NotFoundComponent } from './_shared/NotFound/NotFound.component';

const routes: Routes = [
 // {path:"invoice",loadChildren:()=>import('./invoice/invoice.module').then(m=>m.InvoiceModule)},
  {path:"invoice",component:GetInvoiceComponent},
  {path:"addinvoice",component:AddInvoiceComponent},
  
 // {path:"",redirectTo:"invoice",pathMatch:"full"},
  {path:"**",component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
