import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URI  = 'http:/localhost:3000';
  constructor( private http :HttpClient){ 

  }

  save(product :any) {
     return this.http.post('http://localhost:3000/api/products',product);
  }
}
