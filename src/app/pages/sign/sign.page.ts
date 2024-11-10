import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  // Función para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Validar si todos los campos son completados
  validateInputs(): boolean {
    if (!this.name || !this.email || !this.password) {
      this.presentAlert('Campos requeridos', 'Por favor, completa todos los campos.');
      return false;
    }
    return true;
  }

  // Validar la contraseña
  validatePassword(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    return hasUpperCase && hasSpecialChar && hasMinLength;
  }

  // Función principal de registro
  async sign() {
    // Validar si los campos están completos
    if (!this.validateInputs()) {
      return;
    }

    // Validar la contraseña
    if (!this.validatePassword(this.password)) {
      this.presentAlert('Contraseña inválida', 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un carácter especial.');
      return;
    }

    // Determinar el tipo de cuenta (admin o cliente)
    const role = this.email.includes('@admin') ? 'admin' : (this.email.includes('gmail') || this.email.includes('hotmail') ? 'client' : '');

    if (!role) {
      this.presentAlert('Correo no válido', 'El correo no es válido para crear una cuenta.');
      return;
    }

    // Crear el objeto de usuario y guardarlo en localStorage
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: role,
    };

    localStorage.setItem(this.email, JSON.stringify(user));

    // Redirigir según el tipo de cuenta
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }

    console.log('Usuario registrado con éxito:', user);
  }
}
