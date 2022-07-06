import { InvoiceDetails } from "./invoice-details";

export class Invoice {
    constructor(
        public invoiceId:number=Number(),
        public clientName:string="",
        public date:Date= new Date(),
        public itemsCount:number=Number(),
        public totalPrice:number=Number(),
        public invoiceDetails:InvoiceDetails[]=[],
    ){}
}
