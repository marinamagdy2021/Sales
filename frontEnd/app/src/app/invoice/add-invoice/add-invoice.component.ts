import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Invoice } from 'src/app/_Models/invoice';
import { InvoiceDetails } from 'src/app/_Models/invoice-details';
import { InvoiceServiceService } from '../invoice-service.service';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit , OnDestroy {
  
  invoice:Invoice= new Invoice();
  invoiceDetails: InvoiceDetails[]=[];
  itemsName:string[]=[];
  subscribe:Subscription|null=null;
  id:string="";
  item : any ={itemName:"",quantity:null,price:null,invoiceId:0,total:0};
  showResult = false;
  showError = false;
  onSubmitError = false;
  hideDate= false;

  errorMessage = '';
  isNumberPattern = "^[0-9]+$";
  constructor(public http: HttpClient , public invoiceService: InvoiceServiceService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }
  AddItem(){
    this.onSubmitError= false;

    if((this.item.quantity==(0||null)) || this.item.itemName == "" || (this.item.price==( 0||null)))
    {
      // item name is a part of composite key musn't be dublicated in the table before sending to DB
      this.errorMessage = "missing fields"
      this.showError = true;
      //console.log(this.invoiceDetails);
      return 
    }

    if(this.itemsName.indexOf(this.item.itemName)!=-1){
      this.showError = true;
      this.errorMessage= "This item already exists "
      return ;
    }

    if(!this.item.quantity.match(this.isNumberPattern) || !this.item.price.match(this.isNumberPattern)){
      this.showError = true;
      this.errorMessage= "Either quantity or price is invalid "
      return ;
    }

    this.showError = false;
    this.invoiceDetails.push(new InvoiceDetails(0,this.item.itemName,this.item.price,this.item.quantity));
    // to check on item names inside the table in O(1) instead of O(n) using for loop to get item name from the object
    this.itemsName.push(this.item.itemName);
  }

  fireSubmission(){
    this.onSubmitError= true;
  }
  AddNewInvoice(){
        this.showResult=false;
        this.invoice= new Invoice();
        this.invoiceDetails=[];
        this.item.itemName="";
        this.item.quantity=null;
        this.item.price=null;
  }

  onSubmit( myForm:NgForm){
    if(this.onSubmitError && myForm.valid )
    {
        this.onSubmitError= false;
        //console.log("hello",myForm);
        this.invoiceDetails.map( (item,i) => {
        this.invoice.totalPrice += item.total;
        this.invoice.itemsCount = (i+1);
        this.invoice.invoiceDetails=this.invoiceDetails;
      });
      //console.log(this.invoice);
    this.subscribe = this.invoiceService.generateInvoice(this.invoice).subscribe(
      { next:data=>{
        //console.log(data);
        this.invoice = data;
        this.showResult= true ;
        this.showError = false;
      },
      error:err=>{
        //console.log(err);
        this.showResult= false ;
        this.showError = true;
        this.errorMessage = " This invoice already exists ! " ;
      }}
      );      
    }
  }

}
