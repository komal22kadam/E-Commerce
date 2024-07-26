import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cartData: EventEmitter<number> = new EventEmitter();
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get('http://localhost:3000/products');
  }

  getProduct(id: any) {
    return this.http.get(`http://localhost:3000/products?id=${id}`);
  }

  addToCart(data: any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData)
  }
}
