import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../_Models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {
  baseUrl="https://localhost:7298/api/";

  constructor(public http: HttpClient ) { }

  getInvoice(id:string){
    return this.http.get<any>(this.baseUrl+"invoice/"+id) ;
  }

  editInvoice(invoice:Invoice){
    return this.http.put<undefined>(this.baseUrl+"invoice/",invoice);
  }
  generateInvoice(invoice:Invoice){

  }

}

