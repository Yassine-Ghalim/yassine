import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../Product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie',
  standalone: true,
  styleUrls: ['./categorie.component.css'], // Utilisation de styleUrls pour importer le fichier CSS
  templateUrl: './categorie.component.html',
  imports:[CommonModule]
})


export class CategorieComponent implements OnInit {
  category!: string;
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.filterByCategory(this.category);
    });
  }

  filterByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products];
    });
  }

  showDetails: boolean = false;
  
 

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}