import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product } from './product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {     
  }

  url = "http://localhost:3000/posts";

  getProducts(){
    return this.http.get<any>(this.url).pipe(map((res:any) => {return res}));;
  }

  postProduct(data : any){
    return this.http.post<any>(this.url, data).pipe(map((res:any) => {return res}));
  }

  updateProduct(data : any, id: number){
    return this.http.put<any>(this.url+"/"+id, data).pipe(map((res:any) => {return res}));
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.url+"/"+id).pipe(map((res:any) => {return res}));
  }

}
