import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: any[] = [];

  constructor(private router: Router, private alertController: AlertController) {
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.carrito = navigation.extras.state['carrito'];
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Su compra ha sido finalizada',
      message: 'Tiene que volver a la página anterior si quiere comprar otro producto.',
      buttons: [
        {
          text: 'Volver',
          handler: () => {
            this.finalizarCompra();
            this.router.navigate(['/home']);  
          }
        }
      ],
    });

    await alert.present();
  }

  ngOnInit() {}

 
  eliminarDelCarrito(comic: any) {
    this.carrito = this.carrito.filter(c => c !== comic);
  }

 
  finalizarCompra() {
   
    const historial = JSON.parse(localStorage.getItem('historial') || '[]');
   
    historial.push(...this.carrito);
    
    localStorage.setItem('historial', JSON.stringify(historial));
   
    this.carrito = [];
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
}
