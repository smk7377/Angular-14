import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { SharedService } from '../shared.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  id:number = 0;
  productCode: string ="";  
  productName: string ="";
  instructions : string ="";  
  image:string="";
  rating:number=0;
  status:string ="";
  date: string ="";
  quantity: number=0;
  price:number=0;  
  flagged: string="";
  discount: number;
  

  constructor(private router: Router,
    private _sharedService: SharedService,
    private _restservice : RestService,
    private http: HttpClient) { 

      this.id = 0;
      this.productCode ="";  
      this.productName ="";
      this.instructions ="";        
      this.status ="";
      this.date ="";
      this.quantity =0;
      this.price =0;  
      this.flagged = "";
      this.discount =0;

  }

  ngOnInit(): void {
    let selectedID: any = localStorage.getItem('selectedId');
    let products: product[] =[];
    this._restservice.getProducts().subscribe(data=>{
       if(data && data.length >0)
       {
        products = data.filter((f:any) => f.id == selectedID); 
        if(products.length > 0 && Number(selectedID) > 0){
            this.id=products[0].id;      
            this.productCode=products[0].productCode;
            this.productName=products[0].productName;
            this.instructions=products[0].instructions;            
            this.status=products[0].status;
            this.date=products[0].date;
            this.quantity=products[0].quantity;
            this.price=products[0].price;
            this.flagged=products[0].flagged;            
            this.rating=products[0].rating;
            this.discount=products[0].discount;
          }
       }
    });  
  }

  Addproduct(event:any){
     let products: product[] =[];    
    this._restservice.getProducts().subscribe((data)=>{products = data});    
    let data = {"productCode": event.target.productName.value ,"productName":event.target.productName.value,
    "instructions": event.target.instructions.value,"status": event.target.status.value,    
    "date": new Date(Date.parse(Date())) , "price": event.target.price.value,
    "rating" : event.target.rating.value,
    "discount" : event.target.discount.value,
    "quantity": event.target.quantity.value,"flagged":""}    
    if(Number(this.id) > 0){
      this._restservice.updateProduct(data,Number(this.id)).subscribe((data)=>{products = data});
      localStorage.removeItem('selectedId');
    }
    else{
    this._restservice.postProduct(data).subscribe((data)=>{products = data});;
    }
    this.router.navigateByUrl('home');  
  }
  
}

interface product {  
  id:number;
  productCode: string;  
  productName: string;
  instructions : string;   
  status:string;
  date: string;
  quantity: number;    
  price: number;
  flagged: string;
  rating: number;
  discount: number;
}  

  