import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class PerfilPage implements OnInit {
  imagen: any;
  userData = {
    name: '',
    email: '',
    phone: '',
    image: '' 
  };

  constructor() {}

  ngOnInit() {
    this.loadUserData();
  }

  
  loadUserData() {
    const storedData = localStorage.getItem('userProfile');
    if (storedData) {
      const data = JSON.parse(storedData);
      this.userData = data;
      this.imagen = data.image; 
    }
  }

  
  saveUserData() {
    this.userData.image = this.imagen; 
    localStorage.setItem('userProfile', JSON.stringify(this.userData));
  }

  
  takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      this.imagen = image.webPath; 
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  }
}
