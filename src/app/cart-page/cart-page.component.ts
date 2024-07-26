import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  public cartData: any;
  public FCartData: any;
  public totalPrice = 0;
  public tax = 0;
  public finalPrice = 0
  constructor(private service: ProductsService,private router:Router) {}

  ngOnInit(): void {
    this.cartData = localStorage.getItem('localCart');
    this.FCartData = JSON.parse(this.cartData);
    console.log('**', this.FCartData);
    this.calculatePrice(this.FCartData);
  }

  removeToCart(id: any) {
    console.log('yess');
    let arr = this.FCartData.filter((item: any) => !(item.id == id));
    console.log('****', arr); // [1, 2, 3]
    this.FCartData = arr;
    localStorage.setItem('localCart', JSON.stringify(arr));
    // this.service.addToCart(arr);
    this.calculatePrice(arr);
  }

  calculatePrice(data: []) {
    this.totalPrice = 0;
    this.tax = 0;
    this.finalPrice = 0;
    data.forEach((element) => {
      this.totalPrice += element['price'];
    });
    this.tax = (this.totalPrice*2)/100;
    this.finalPrice = this.tax + this.totalPrice;
    console.log('&&&&', this.totalPrice);
    localStorage.setItem('val',JSON.stringify(this.finalPrice))
  }

  checkout(){
    if(this.FCartData.length > 0){
      this.router.navigate(['/checkout']);
    }
  }
}
