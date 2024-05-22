import { Component, OnInit } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Product } from '../Product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailsComponent,CommonModule,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  

  userId: number | undefined = undefined; // Initialiser userId à undefined

  public products: Product[] = [];
  selectedProducts: Product[] = [];
  myArray:any=[];
  product: any;
  searchKeyword: string = '';
  originalProducts: Product[] = []; // Déclaration de originalProducts
 
  constructor( private ps : ProductService ,private router: Router,private auth:AuthService){}
  
  ngOnInit(): void {
    this.userId = this.auth.getCurrentUserId(); // Obtenir l'ID de l'utilisateur actuel
    console.log(this.userId);
    this.getProduct();
 
}
  


  isLowQuantity(quantity: number): boolean {
    return this.ps.isLowQuantity(quantity);
  }

  purchase1(product: Product): void {
    if (this.userId !== undefined) {
      this.ps.purchase3(product); // Utiliser l'ID de l'utilisateur pour l'achat
    } else {
      // Gérer le cas où l'utilisateur n'est pas connecté
    }
  }
  
  

  addToCard(product: Product): void {
    const userId = this.auth.getCurrentUserId(); // Obtenez l'ID de l'utilisateur actuel
    if (userId !== undefined) {
      this.ps.addToCart(product, userId).subscribe(success => {
        if (success) {
          console.log('Product added to cart successfully.');
        } else {
          console.error('Error adding product to cart.');
        }
      });
    } else {
      console.error('User is not logged in.');
    }
  }
  
  
getSelectedProducts(): void {
  this.ps.getSelectedProducts();
}
//get
getProduct() {
  this.ps.getAll().subscribe(data => {
    this.myArray = data;
    this.originalProducts = data; // Initialisation de originalProducts avec les données reçues
  });
}

//delete
deleteProduct(id :string){
  this.ps.delete(id).subscribe(()=>{
    this.myArray=this.myArray.filter
    ((product: { id: string; }) =>product.id != id)
  })
}

//create
createProduct(newProduct:Product){
  this.ps.create(newProduct);
}

//edit
updateProduct(updatedProduct: Product): void {
  this.ps.update(updatedProduct);
  this.router.navigate(['/catalog/edit', updatedProduct.id]); 
}
getById(id: string):void {
  this.ps.getById(id);
}

performSearch(): void {
  if (this.searchKeyword.trim() !== '') {
    this.myArray = this.myArray.filter((product: { name: string; }) =>
      product.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  } else {
    // Si la barre de recherche est vide, rétablir tous les produits
    this.myArray = this.originalProducts;
  }
}


}
