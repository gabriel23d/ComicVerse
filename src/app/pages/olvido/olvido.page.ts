import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.page.html',
  styleUrls: ['./olvido.page.scss'],
})
export class OlvidoPage {
  email: string = '';

  constructor(private router: Router) {}

  resetPassword() {
    
    console.log('Enviando enlace de restauración a:', this.email);
    alert('Se ha enviado un enlace de restauración a tu correo.');
    this.router.navigate(['/login']);
  }
}