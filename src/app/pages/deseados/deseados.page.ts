import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deseados',
  templateUrl: 'deseados.page.html',
  styleUrls: ['deseados.page.scss'],
})
export class DeseadosPage {
  deseados: any[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.deseados = nav?.extras.state?.['deseados'] || [];
  }
}

