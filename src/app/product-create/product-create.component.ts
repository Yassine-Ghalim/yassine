import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms'; 
import { Product } from '../Product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  newProduct: Product = new Product('', '', '', 0, 0, '',''); 

  constructor(private productService: ProductService,private router : Router) { }

  onSubmit(): void {
    // Générer un identifiant unique à partir de la date actuelle
    const productId = new Date().getTime().toString();
    this.newProduct.id = productId;

    this.productService.create(this.newProduct).subscribe({
      next: (_data) => {
        console.log('Product created successfully!');
        this.newProduct = new Product('', '', '', 0, 0, '', '');
        this.router.navigate(['/catalog/product']); // Redirection vers la liste des produits après la mise à jour

      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }}