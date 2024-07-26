import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute ,Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  AllProducts: any;

  constructor(private product: ProductsService,private router:Router) {}

  ngOnInit(): void {
    this.product.getAllProducts().subscribe((data) => {
      this.AllProducts = data;
      console.log('this.AllProducts', this.AllProducts);
    });
  }

  addToCart(id:any){
    let arr = this.AllProducts.filter((item: any) => (item.id == id));
    console.log("arr",arr)
    this.product.addToCart(arr[0]);
    this.router.navigate(['/cart-page']);
  }
}
