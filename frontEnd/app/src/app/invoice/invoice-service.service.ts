import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../_Models/invoice';
import { InvoiceDetails } from '../_Models/invoice-details';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {
  baseUrl="https://localhost:7298/api/";

  constructor(public http: HttpClient ) { }

  getInvoice(id:string){
    return this.http.get<any>(this.baseUrl+"invoice/"+id) ;
  }

  editInvoice(id:number,invoice:Invoice){
    return this.http.put<undefined>(this.baseUrl+"invoice/"+id,invoice);
  }

  generateInvoice(invoice:Invoice){
    return this.http.post<any>(this.baseUrl+"invoice/",invoice);
  }

  deleteInvoice(id:string){
    return this.http.delete<any>(this.baseUrl+"invoice/"+id);
  }

}

