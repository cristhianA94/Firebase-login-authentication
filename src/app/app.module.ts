import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

/* Componentes */
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/user/login/login.component';
//import { ProfileComponent } from './components/users/profile/profile.component';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
//import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


/* Rutas */
//corregir esto 
import { APP_ROUTING } from './app.routes';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
  //ProfileComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase), //inicializa conexcion Firebase
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    //NgxAuthFirebaseUIModule
    //AngularFireStorageModule // imports firebase/storage only needed for storage features
    // modulos para usar formularios
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    // modulo de angular material
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
