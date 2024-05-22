import { Injectable, OnInit } from '@angular/core';
import { Product } from './Product';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of,Subject, switchMap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cart } from './cart';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:3000/products'; // API URL for products

  alertmessage$: any;
  forEach(arg0: (product: { message: string; }) => void) {
    throw new Error('Method not implemented.');
  }
  


  constructor( private router : Router,private http : HttpClient,auth:AuthService) {
   }
 
  
   products: Product[] = []; // Tableau de produits
   private Q :number=0;
   private selectedProducts: Product[] = [];
   
   private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
   public cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();
 



  isLowQuantity(quantity: number): boolean {
    return quantity < 5;
  }
 
  // Dans le service ProductService
purchase3(product: Product): void {
  if (product.quantity > 0) {
    product.quantity--; // Décrémenter la quantité
    if (product.quantity < 5) {
      product._alertMessage = `⚠︎ Quantité restante inférieure à 5 !`;
    }
  } else {
    product._alertMessage = `Produit épuisé !`;
  }
}
private cartsUrl = 'http://localhost:3000/carts'; // URL de votre backend (par exemple, une API REST)


getCarts(): Observable<Cart[]> {
  return this.http.get<Cart[]>(this.cartsUrl);
}
addToCart(product: Product, userId: number): Observable<boolean> {
  const cartItem: Cart = {
    productId: product.id,
    userId: userId,
    quantity: 1
  };
  
  return this.http.post<any>(this.cartsUrl, cartItem).pipe(
    map(() => true), // Retourner true si l'ajout est réussi
    catchError(() => {
      console.error('Error adding cart item');
      return throwError(false); // Retourner false en cas d'erreur lors de l'ajout
    })
  );
}
//   const currentItems = this.cartItemsSubject.getValue(); // Obtenir les produits actuels du panier
//   const existingProduct = currentItems.find(item => item.id === product.id); // Rechercher le produit dans le panier

//   if (existingProduct) {
//     existingProduct.quantity++; // Augmenter la quantité si le produit existe déjà dans le panier
//   } else {
//     currentItems.push(product); // Ajouter le produit au panier s'il n'existe pas déjà
//   }

//   this.cartItemsSubject.next(currentItems); // Mettre à jour le BehaviorSubject avec les produits du panier
// }

  getSelectedProducts(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  

// Dans le service ProductService
removeFromCart(product: Product): void {
  const currentItems = this.cartItemsSubject.getValue(); // Obtenir les produits actuels du panier
  const updatedItems = currentItems.filter(item => item.id !== product.id); // Filtrer les produits pour exclure celui à supprimer

  this.cartItemsSubject.next(updatedItems); // Mettre à jour le BehaviorSubject avec les nouveaux produits du panier
}
increaseQuantity(product: Product): void {
  product.quantity++; // Incrémente la quantité du produit
}

decreaseQuantity(product: Product): void {
  if (product.quantity > 1) {
    product.quantity--; // Décrémente la quantité si elle est supérieure à 1
  }
}

  //get
  getAll(page: number=1,size: number=8) {
    return this.http.get<Product[]>(`${this.apiUrl}?_page=${page}&_limit=${size}`);
  }
  //delete
  delete(id: string): Observable<any> {
   return this.http.delete(`${this.apiUrl}/${id}`);
  }
  //create
  create(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.apiUrl}`, product);
  }

  private addedProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  addedProducts$ = this.addedProductsSubject.asObservable();

  //edit
  update(product: Product): Observable<any> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product)
  }


  getById(id: string): Observable<Product> {
    console.log("1");
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  
  getProductsByCategory(category: string): Observable<Product[]> {
    const url = `${this.apiUrl}?category=${category}`;
    return this.http.get<Product[]>(url);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const url = `${this.apiUrl}?name_like=${keyword}`;
    return this.http.get<Product[]>(url);
  }


  
  }
  







