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
  showError2 = false;
  hideDate= false;
  enableEdit = false;
  errorMessage = '';
  errorMessage2 = '';
  IdPattern = "^[0-9]+$";
  item : any ={itemName:"",quantity:null,price:null,invoiceId:0,total:0};

  constructor(public invoiceService: InvoiceServiceService , private confirmationService: ConfirmationService){ }
 
  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  ngOnInit(): void {
  }
  // update to database 
  update(){
    if((this.item.quantity==(0||null)) || this.item.itemName == "" || (this.item.price==( 0||null)) || (this.invoice.clientName==(""||null)))
    {
      // item name is a part of composite key musn't be dublicated in the table before sending to DB
      this.errorMessage2 = "this invoice already is up to date !"
      this.showError2 = true;
      this.showError = false;
      //console.log(this.invoiceDetails);
      return 
    }
       this.invoice.invoiceDetails= this.invoiceDetails;
      this.subscribe = this.invoiceService.editInvoice(this.invoice.invoiceId,this.invoice).subscribe(
      { next:data=>{
        //console.log(data);
        this.showResult= true ;
        this.showError=this.showError2  = false;
        alert("Updated successfuly");
      },
      error:err=>{
        this.showError= this.showResult= false ;
        this.showError2 = true;
        this.errorMessage2 = " something went wrong ! " ;
        //console.log(err);
      }}
      );}

  Back(){
    this.enableEdit= false;
  }

  //update specific row
  updateRow(i:any){
    this.enableEdit= true;
    this.item= i ;
  }

//save update of aspecific row
  saveUpdate(itm:any){
    this.enableEdit= false;
    this.invoice.totalPrice -=itm.total;
    this.item.total = itm.quantity*itm.price ;
    this.invoice.totalPrice+= itm.total ;
  }

//show the table
  ShowInvoiceDetails(){
    if(this.id.match(this.IdPattern)&&this.id!="")
    {
      this.subscribe = this.invoiceService.getInvoice(this.id).subscribe(
        { next:data=>{
        //console.log(data);
        this.hideDate= this.enableEdit=this.showError2 =this.showError = false;
        this.showResult= true ;
        this.invoiceDetails= data.invoiceDetails;
        this.invoice = data;
      },
      error:err=>{
        this.showError2 =this.showResult= false ;
        //console.log('wrong ID', err);
        this.showError = true;
        this.errorMessage = 'Invalid ID !' ;
      }}
      );
    }else if(this.id==""){
      this.showError = true;
      this.showError2 = false;
      this.errorMessage = 'ID is required!' ;
    }else
    {
      this.showError2 = false;
      this.showError = true;
      this.errorMessage = 'ID must be a number!' ;
    }
  }
  clearData(){
    this.hideDate= true;
    this.showError =this.showError2 = false;
    this.invoice=new Invoice();
    this.invoiceDetails=[];
  }

  confirm(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this invoice ?',
      accept: () => {
        this.subscribe = this.invoiceService.deleteInvoice(this.id).subscribe(
          { next:data=>{
                //console.log("Deleted",data);
                this.id ="";
                this.showResult = this.showError =this.showError2 = false;
           },
           error:err=>{
            //console.log("still ",err);
           }}
         );
      }
 });
  }


}
