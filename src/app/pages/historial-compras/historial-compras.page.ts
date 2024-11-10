import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.page.html',
  styleUrls: ['./historial-compras.page.scss'],
})
export class HistorialComprasPage {
  historial = JSON.parse(localStorage.getItem('historial') || '[]');
}

