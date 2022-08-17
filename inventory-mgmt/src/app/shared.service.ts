import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  public data : any ;  
  public loggedinUserId : number =0;
  public productData : any;
  
}
