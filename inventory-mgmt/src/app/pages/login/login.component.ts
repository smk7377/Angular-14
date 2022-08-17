import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import loginData  from '../../login.json'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String ="";
  password : String= "";  
  userdata: userData[] = loginData;  
  ValidationErors : any[] =[];
  

  constructor(private router: Router,
    private _sharedService: SharedService) {     
   }


  
  ngOnInit(): void {
    this._sharedService.data ={};
    localStorage.removeItem('selectedId');
  }

  submit(){      
      let loggedinData = this.userdata.filter(x => x.name == this.username && x.password == this.password);
      

      if(loggedinData.length > 0)
      {
        this._sharedService.data = loggedinData;        
        localStorage.setItem("User",JSON.stringify(loggedinData));        
        this.router.navigateByUrl('home');        
      }
      else{
        this.ValidationErors.push("Invalid Credentials");
      }

  }
  
  Singup(){
    
  }

}

interface userData {  
  id: Number;  
  name: String;  
  role: String;  
  email: String;       
  password : string;
}  
