import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent {
  product: Product = new Product('', '', '', 0, 0, '',''); // Utilisation du constructeur de Product pour initialiser l'objet

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      const productId = params.get('id');
      console.log(productId);
      if (productId) {
        this.productService.getById(productId).subscribe(product => {
          console.log("2");
          console.log("3 "+product);
          this.product.id=product.id;
          this.product.name=product.name;
          this.product.description=product.description;
          this.product.quantity=product.quantity;
          this.product.price=product.price;
          this.product.img=product.img;
          this.product.category=product.category;
        });
      }
    });
  }

  onSubmit(): void {
    this.productService.update(this.product).subscribe({
      next: (_data) => {
        console.log('Product updated successfully!');
        this.router.navigate(['/catalog/product']); // Redirection vers la liste des produits après la mise à jour
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }
}