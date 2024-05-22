import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone:true,
  imports : [CommonModule]

})
export class CartComponent {
  
  selectedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getSelectedProducts().subscribe(items=>(
      this.selectedProducts=items
    ));
  }
// Dans le composant Cart
removeFromCart(product: Product): void {
  this.productService.removeFromCart(product); // Assurez-vous que product est bien une instance de Product
}

increaseQuantity(product: Product): void {
  this.productService.increaseQuantity(product); // Appeler la méthode d'augmentation de quantité du service
}

decreaseQuantity(product: Product): void {
  this.productService.decreaseQuantity(product); // Appeler la méthode de décrémentation de quantité du service
}

}

