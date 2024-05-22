import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  getImagePath(): string {
    // Supposons que les images sont stockées dans un dossier "assets/images" avec le format nommé comme "product_id.jpg"
    return `assets/img/img$.jpg`;
  }

}
