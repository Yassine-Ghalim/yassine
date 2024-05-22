import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppUser } from '../model/user.model';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    const formValue = this.loginForm.value;
    const username = formValue.username; // Utilisez formValue pour accéder aux valeurs du formulaire
    const password = formValue.password;

    this.authService.login(username, password).subscribe(
      (success) => {
        if (success) {
          const roles = [];
          if (username === 'ghalimyassine3@gmail.com') {
            roles.push('ADMIN');
          } else {
            roles.push('USER');
          }
    
          const authenticatedUser: AppUser = {
            id: 1, // ID simulé, assurez-vous de l'obtenir correctement
            email: username,
            password: '', // Ne stockez jamais le mot de passe en clair
            roles: roles, // Utiliser les rôles définis
            username: ''
          };

          this.authService.authenticatuser(authenticatedUser).subscribe(() => {
            this.router.navigate(['/catalog/Accueil']);
          });
        } else {
          this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        }
      },
      (error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'Une erreur est survenue lors de la connexion. Veuillez réessayer.';
      }
    );
  }
 

}
