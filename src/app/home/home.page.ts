import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  comics: any[] = [
    {
      id: 1,
      title: 'Spider-Man: No Way Home',
      description: 'Spider-Man debe lidiar con las consecuencias de su identidad revelada mientras enfrenta a nuevos villanos de otros universos.',
      category: 'Superhéroes',
      imageUrl: 'https://i.redd.it/f97mmxdvd4781.jpg',
      author: 'Marvel Comics',
      illustrator: 'Steve Ditko',
      editor: 'Stan Lee',
      publishDate: '20 de diciembre de 2021',
      price: '$14.900'
    },
    {
      id: 2,
      title: 'Batman: Hush',
      description: 'Una historia que sigue a Batman mientras trata de desentrañar un misterioso enemigo que conoce todos sus secretos.',
      category: 'Superhéroes',
      imageUrl: 'https://cdnx.jumpseller.com/shazam-online/image/16365875/Batman_hush_ovni.jpg?1657213982',
      author: 'DC Comics',
      illustrator: 'Jim Lee',
      editor: 'Jeph Loeb',
      publishDate: '22 de abril de 2003',
      price: '$12.500'
    },
    {
      id: 3,
      title: 'Maus',
      description: 'Una historia gráfica de la vida durante el Holocausto, representando a los judíos como ratones y a los nazis como gatos.',
      category: 'Histórico',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Maus_%28volume_1%29_cover.jpg',
      author: 'Art Spiegelman',
      illustrator: 'Art Spiegelman',
      editor: 'Pantheon Books',
      publishDate: '2 de agosto de 1991',
      price: '$18.000'
    },
    {
      id: 4,
      title: 'Watchmen',
      description: 'Un grupo de superhéroes se enfrenta a la conspiración de un antiguo compañero mientras el mundo está al borde de la guerra.',
      category: 'Superhéroes',
      imageUrl: 'https://images.cdn1.buscalibre.com/fit-in/360x360/e3/d8/e3d8e9b9229ead55e155c48bedeba9ae.jpg',
      author: 'Alan Moore',
      illustrator: 'Dave Gibbons',
      editor: 'DC Comics',
      publishDate: '13 de septiembre de 1986',
      price: '$22.000'
    },
    {
      id: 5,
      title: 'Sandman',
      description: 'La historia de Morfeo, el Señor de los Sueños, mientras navega por el mundo de los sueños y la realidad.',
      category: 'Fantasía',
      imageUrl: 'https://images.cdn2.buscalibre.com/fit-in/360x360/34/53/34531c07a6c62011ca70f93a5e789853.jpg',
      author: 'Neil Gaiman',
      illustrator: 'Sam Kieth',
      editor: 'Vertigo Comics',
      publishDate: '29 de noviembre de 1988',
      price: '$19.500'
    },
    {
      id: 6,
      title: 'Saga',
      description: 'Una épica mezcla de fantasía y ciencia ficción que sigue a una pareja de diferentes razas mientras luchan por su familia.',
      category: 'Ciencia Ficción',
      imageUrl: 'https://cdnx.jumpseller.com/shazam-online/image/23256134/saga_integral_01.jpg?1649351128',
      author: 'Brian K. Vaughan',
      illustrator: 'Fiona Staples',
      editor: 'Image Comics',
      publishDate: '10 de octubre de 2012',
      price: '$16.800'
    },
    {
      id: 7,
      title: 'Persepolis',
      description: 'Una autobiografía gráfica que cuenta la historia de una niña que crece durante la Revolución Islámica en Irán.',
      category: 'Histórico',
      imageUrl: 'https://images.cdn2.buscalibre.com/fit-in/360x360/0a/c6/0ac64e996a588462161843831786cdb3.jpg',
      author: 'Marjane Satrapi',
      illustrator: 'Marjane Satrapi',
      editor: 'L\'Association',
      publishDate: '15 de noviembre de 2000',
      price: '$15.000'
    },
    {
      id: 8,
      title: 'V for Vendetta',
      description: 'En un futuro distópico, un enigmático vigilante conocido como "V" busca derrocar a un gobierno totalitario.',
      category: 'Ciencia Ficción',
      imageUrl: 'https://images.cdn2.buscalibre.com/fit-in/360x360/46/70/4670d6ac966abce7595163b261711497.jpg',
      author: 'Alan Moore',
      illustrator: 'David Lloyd',
      editor: 'Vertigo Comics',
      publishDate: '10 de marzo de 1988',
      price: '$17.500'
    },
    {
      id: 9,
      title: 'Bone',
      description: 'La historia sigue a tres primos mientras se aventuran en un mundo de fantasía lleno de misterios y criaturas.',
      category: 'Fantasía',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZYX75cgP65OBlWZWKwIi_PetHKECLNPhVeQ&s',
      author: 'Jeff Smith',
      illustrator: 'Jeff Smith',
      editor: 'Cartoon Books',
      publishDate: '1 de julio de 1991',
      price: '$14.200'
    },
    {
      id: 10,
      title: 'Locke & Key',
      description: 'Una historia sobre una familia que se muda a una antigua mansión con llaves mágicas que otorgan poderes especiales.',
      category: 'Terror',
      imageUrl: 'https://tiendapanini.cl/media/catalog/product/Q/L/QLOKE008HC.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=897&width=960&canvas=960:897',
      author: 'Joe Hill',
      illustrator: 'Gabriel Rodríguez',
      editor: 'IDW Publishing',
      publishDate: '19 de diciembre de 2008',
      price: '$20.000'
    }
  ];

  filteredComics: any[] = [...this.comics];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedComic: any;
  cart: any[] = [];

  categories: string[] = ['Superhéroes', 'Fantasía', 'Ciencia Ficción', 'Terror', 'Histórico'];

  constructor(private router: Router, private toastController: ToastController) {
    this.listenToNetworkChanges();
  }

  // Filtrar cómics por categoría y término de búsqueda
  filterComics() {
    this.filteredComics = this.comics.filter(comic => {
      const matchesCategory = this.selectedCategory ? comic.category === this.selectedCategory : true;
      const matchesSearchTerm = comic.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  }

  // Mostrar detalles de un cómic
  toggleDetails(comic: any) {
    this.selectedComic = this.selectedComic === comic ? null : comic;
  }

  // Agregar cómic al carrito
  addToCart(comic: any) {
    this.cart.push(comic);
    console.log(`${comic.title} ha sido agregado al carrito.`);
  }

  // Funciones de navegación
  navigateToProfile() {
    this.router.navigate(['/perfil']);
  }

  navigateToCarrito() {
    this.router.navigate(['/carrito']);
  }

  navigateToAbout() {
    this.router.navigate(['/acercade']);
  }

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }

  // Escuchar cambios en el estado de red y mostrar un mensaje de conexión
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

  // Verificar el estado de red actual y mostrar mensaje
  async logCurrentNetworkStatus() {
    const status = await Network.getStatus();
    const toast = await this.toastController.create({
      message: `Estado de la conexión: ${status.connected ? 'conectado' : 'desconectado'}`,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}


