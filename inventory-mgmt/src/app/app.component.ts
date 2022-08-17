import { Component } from '@angular/core';
import loginData  from './login.json';  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory-mgmt';
  userdata: userData[] = loginData;  
}

    
interface userData {  
    id: Number;  
    name: String;  
    role: String;  
    email: String;       
    password : string;
}  