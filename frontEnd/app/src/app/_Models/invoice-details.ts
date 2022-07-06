export class InvoiceDetails {
    constructor(
        public invoiceId:number=Number(),
        public itemName:string="",
        public price:number=0,
        public quantity:number=0,
        public total:number=price*quantity,

    ){}
}
