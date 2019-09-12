import { Component, OnInit } from '@angular/core';
/* Firebase */
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(
    /* Inicializa objeto Firebase */
    private authService: AuthService,
    private afsAuth: AngularFireAuth) { }

  public isLogged: boolean = false;
  
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }

  onLogout() {
    this.afsAuth.auth.signOut();
  }
}
