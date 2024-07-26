import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItem = 0;

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItem = JSON.parse(cartData).length
    }
    this.service.cartData.subscribe((item:any) =>{
      this.cartItem = item.length;
    })
  }

}
