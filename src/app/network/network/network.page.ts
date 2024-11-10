import { Component, OnInit } from '@angular/core';

import { AlertController, ToastController } from '@ionic/angular';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {

  constructor(public alertController: AlertController, private toastController: ToastController) {
    // watch network for a disconnection
    this.listenToNetworkChanges();
  }

  ngOnInit() {
    
  }
  async listenToNetworkChanges() {
    Network.addListener('networkStatusChange', async (status) => {
      const toast = await this.toastController.create({
        message: `Estado de la conexion: ${status.connected ? 'conectado' : 'desconectado'}`,
        duration: 2000,
        position: 'bottom',
      });
      await toast.present();
    });
  }

  async logCurrentNetworkStatus() {
    const status = await Network.getStatus();
    const toast = await this.toastController.create({
      message: `Estado de la conexion: ${status.connected ? 'conectado' : 'desconectado'}`,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: msj,
      buttons: ['OK'],
    });



}
}