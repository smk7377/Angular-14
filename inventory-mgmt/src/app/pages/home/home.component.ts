import { NgStyle } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { window } from 'rxjs';
import { RestService } from 'src/app/rest.service';
import { SharedService } from 'src/app/shared.service';
import productData  from '../../products.json';  

declare var window : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
  products: product[] =[];
  userRole : string ="";
  userId : number =0;
  userName : string ="";
  ratingArr : any[] = [];
  formModal :any ;
  popupData: string= "";
  searchTerm: string= "";

  constructor(private _sharedService: SharedService,
    private rest: RestService,
    private router: Router) {   
    this.userId = this._sharedService.loggedinUserId;            
    let userdata = JSON.parse(JSON.stringify(localStorage.getItem("User")));
    this.userRole = JSON.parse(userdata)[0].role;
    this.userName = JSON.parse(userdata)[0].name;      
    this.renderData();
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModal")
    );
    this.renderData();
  }

  openPopup(product:any){

    let  ratingData ="";
    
    if(product.rating > 0){
      for(let i=0;i< product.rating ; i++){        
        ratingData +="<span class='fa fa-star checked'></span>";        
      }
    }
    

    this.popupData="";    
    this.popupData +="<p> <b> Product Name: </b>" + product.productName +"</p>" ;
    this.popupData +="<p> <b> Product Code: </b>" + product.productCode +"</p>" ;
    this.popupData +="<p> <b> Rating: </b>" + ratingData +"</p>" ;
    this.popupData +="<p> <b> Instructions: </b>" + product.instructions +"</p>" ;
    this.popupData +="<p> <b> Flagged: </b>" + product.flagged +"</p>" ;
    this.popupData +="<p> <b> Price: </b> "+ "$" +product.price+" </p>" ;
    this.popupData +="<p> <b> Status: </b>" + product.status +"</p>" ;
    this.popupData +="<p> <b> Discount: </b>" + "$" + product.discount +"</p>" ;
    this.popupData +="<p> <b> Image: </b>" + "<img height='100px' src='../../assets/images/product.png' />" +"</p>" ;    
    this.formModal.show();
  }

  closePopup(){
    this.formModal.hide();
  }

  logout(){
    localStorage.removeItem("User");
    localStorage.removeItem('selectedId');
    this.router.navigate(['/login']); 
  }
  renderData(){
    this.rest.getProducts().subscribe((data)=>{
      if(data &&  data.length > 0){
    data.forEach((element:any) => {         
      let dateCheckOut = element.date;      
        const dateToBeCheckOut = new Date(dateCheckOut);        
        const today = new Date(Date.parse(Date()));               
        let diffInMs = Math.abs(today.getTime() - dateToBeCheckOut.getTime());
        let days = diffInMs / (1000 * 60 * 60 * 24);        
        if(days > 365){
          element.flagged = "true";
        }
        else
        element.flagged = "false";
    });
    this.products = data;
  }
  });
  }

  movetoDiscount(){
    this.router.navigate(['/discount']);    
  }

   formatDate = (date: Date) => {
    function pad(s:any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date)
    return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
  }

  deletProduct(p: product){    
    this.rest.deleteProduct(p.id).subscribe((data)=>{        
      this.renderData();        
    });    
    
  }

  addProduct(){
    localStorage.removeItem('selectedId');
    this.router.navigate(['/addproduct']);    
  }

  editProduct(p: product){
    localStorage.removeItem('selectedId');
    localStorage.setItem('selectedId', p.id.toString());
    this.router.navigate(['/addproduct']);    
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
  discount: number;
}  
