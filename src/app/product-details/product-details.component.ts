import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  public productData: any;
  productQuantity: number = 0;
  showRemoveCart:boolean = false;
  constructor(
    private routes: ActivatedRoute,
    private service: ProductsService,
    private router:Router
  ) {}

  ngOnInit(): void {
    var ProdId = this.routes.snapshot.paramMap.get('productId');
    this.service.getProduct(ProdId).subscribe((data: any) => {
      this.productData = data[0];
      let cartData = localStorage.getItem('localCart');
      if(ProdId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:any) => ProdId == item.id.toString())
        if(items.length){
          this.showRemoveCart = true;
        }else{
          this.showRemoveCart = false
        }
      }
    });
  }

  removeToCart(ProdId:Number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items = JSON.parse(cartData)
      items = items.filter((item:any) =>  {
        ProdId !== item.id
       })

      
    }
  }

  prodQuantity(type: string) {
    if (this.productQuantity < 10 && type == 'max') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && type == 'min') {
      this.productQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.productQuantity) {
      // this.productData.quantity = this.productQuantity;
      this.service.addToCart(this.productData);
      
      this.router.navigate(['']);
    }
  }
}
