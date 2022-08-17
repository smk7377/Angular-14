export class product{
    id:number = 0;
    productCode: string ="";  
    productName: string ="";
    instructions : string ="";  
    image:string="";
    status:string ="";
    date: string ="";
    quantity: number=0;
    price:number=0;  
    flagged: string="";

    constructor(id :number,productCode: string,productName:string,instructions:string,image:string,status:string,date:string,quantity:number,price:number,flagged:string){
        this.id = id;
        this.productCode=productCode;
        this.productName = productName;
        this.instructions = instructions ;
        this.image= image ; 
        this.status =status;
        this.date =date ;
        this.quantity =quantity;
        this.price =price;
        this.flagged =flagged;


    }
}