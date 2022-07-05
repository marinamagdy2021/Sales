import { Routes, RouterModule } from '@angular/router';
import { GetInvoiceComponent } from './get-invoice/get-invoice.component';

const routes: Routes = [
  //no need for lazy loading as the task is short 
//  {path:"",component:GetInvoiceComponent},
 
];

export const InvoiceRpoterRoutes = RouterModule.forChild(routes);
