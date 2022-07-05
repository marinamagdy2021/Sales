import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/_Models/invoice';
import { InvoiceDetails } from 'src/app/_Models/invoice-details';
import { InvoiceServiceService } from '../invoice-service.service';


@Component({
  selector: 'app-get-invoice',
  templateUrl: './get-invoice.component.html',
  styleUrls: ['./get-invoice.component.css'],
  providers: [ConfirmationService]
})
export class GetInvoiceComponent implements OnInit ,OnDestroy{
  invoice:Invoice= new Invoice();
  invoiceDetails: InvoiceDetails[]=[];
  subscribe:Subscription|null=null;
  id:string="";
  showResult = false;
  showError = false;
  hideDate= false;
  errorMessage = '';
  IdPattern = "^[0-9]+$";
//,private confirmationService: ConfirmationService
  constructor(
          public invoiceService: InvoiceServiceService 
    ,     private confirmationService: ConfirmationService,
    ){ }
 
  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  ngOnInit(): void {
    
  }
  ShowInvoiceDetails(){
    this.subscribe = this.invoiceService.getInvoice(this.id).subscribe(
      { next:data=>{
        this.hideDate= false;
        console.log(data);
        this.invoiceDetails= data.invoiceDetails
        this.invoice = data;
        this.showResult= true ;
        this.showError = false;
       },
       error:err=>{
          this.showResult= false ;
          console.log('wrong ID', err);
          this.showError = true;
          this.errorMessage = 'Invalid ID !' ;
       }}
     );
  }
  clearData(){
    this.hideDate= true;
    this.invoice=new Invoice();
    this.invoiceDetails=[];
  }

  confirm(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this invoice ?',
      accept: () => {
        this.subscribe = this.invoiceService.deleteInvoice(this.id).subscribe(
          { next:data=>{
                console.log("Deleted",data);
                this.showResult = false;
           },
           error:err=>{
            console.log("still ",err);
           }}
         );
      }
 });
  }


}
