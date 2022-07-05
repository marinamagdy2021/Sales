export class InvoiceDetails {
    constructor(
        public invoiceId:number=Number(),
        public itemName:string="",
        public price:number=Number(),
        public quantity:number=Number(),
        public total:number=Number(),

    ){}
}
