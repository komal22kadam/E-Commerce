import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public totalVal:any;
  ShippingForm!: FormGroup;
  ngOnInit() {
    this.totalVal = localStorage.getItem('val')
    this.ShippingForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required)
    });
  }
  onSubmit() {
    // Handle form submission here
    if (this.ShippingForm.valid) {
      console.log(this.ShippingForm.value);
      alert("ordered suceesfully")
      // Additional logic to authenticate user or 
      // perform other actions
    }
  }

}
