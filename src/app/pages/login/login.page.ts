import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.listenToNetworkChanges();
  }

  async listenToNetworkChanges() {
    Network.addListener('networkStatusChange', async (status) => {
      const toast = await this.toastController.create({
        message: `Estado de la conexión: ${status.connected ? 'conectado' : 'desconectado'}`,
        duration: 2000,
        position: 'bottom',
      });
      await toast.present();
    });
  }

  async logCurrentNetworkStatus() {
    const status = await Network.getStatus();
    const toast = await this.toastController.create({
      message: `Estado de la conexión: ${status.connected ? 'conectado' : 'desconectado'}`,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
    return status.connected;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Validación de los campos requeridos
  validateInputs(): boolean {
    if (!this.email || !this.password) {
      this.presentAlert('Campos requeridos', 'Por favor, completa todos los campos.');
      return false;
    }
    return true;
  }

  async login() {
    // Validación de campos vacíos
    if (!this.validateInputs()) {
      return;
    }

    // Verificar el estado de la red
    const isConnected = await this.logCurrentNetworkStatus();
    if (!isConnected) {
      this.presentAlert('Conexión a Internet', 'No hay conexión a internet. Por favor, verifica tu conexión e intenta de nuevo.');
      return;
    }

    // Obtener los datos de usuario del localStorage
    const storedUser = JSON.parse(localStorage.getItem(this.email) || '{}');

    // Validar credenciales
    if (storedUser && storedUser.password === this.password) {
      if (storedUser.role === 'admin') {
        // Redirigir a la vista de administrador si es admin
        this.router.navigate(['/admin']);
      } else {
        // Redirigir a la vista principal si es cliente
        this.router.navigate(['/home']);
      }
    } else {
      this.presentAlert('Error de Credenciales', 'Correo o contraseña incorrectos. Por favor, intenta de nuevo.');
    }
  }
}
