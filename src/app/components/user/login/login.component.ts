import { Component, OnInit } from '@angular/core';

/* Firebase */
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{


  loginForm: FormGroup;
  registroForm: FormGroup;
  
  constructor(
    // crear servicio nunca declarar en los componenes, solo se debe llamar al servicio
    public afAuth: AngularFireAuth,
    private router: Router,
    // servicio creado donde esta la logia de autenticacion
    private authService: AuthService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      clave: ['', Validators.required],
    });
    this.registroForm = this.fb.group({
      correo: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }
  loginFb() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  login() {
    this.authService.loginCorreo(this.loginForm.value);
  } 
  registro(){
    console.log(this.registroForm.value)
    this.authService.registerUser(this.registroForm.value);
  }
  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => console.log('err', err.message));
  }
  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}