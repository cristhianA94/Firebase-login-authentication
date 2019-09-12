import { Injectable } from '@angular/core';

/* Firebase */
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

// import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { UserInterface, Rol } from '../../clases/usuario';
import { map } from 'rxjs/operators';
import { AlertaService } from '../alerta/alerta.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // user: Observable<UserInterface>;
  // roles: Observable<Rol[]>;
  // private rolCollection: AngularFirestoreCollection<Rol>;

  // private userDoc: AngularFirestoreDocument<UserInterface>;
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private alerta: AlertaService,
  ) {
  }

  loginCorreo(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.correo, data.clave).then(value => {
      console.log('Nice, it worked!');
      this.alerta.mensajeExito('Exito!', 'Acceso al sistema.');
      this.router.navigate(['/home']);
    })
      .catch(err => {
        this.alerta.mensajeError('Error', err.message);
        console.log('Something went wrong:', err.message);
      });
  }
  loginCorreoDialog(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.correo, data.clave);
  }

  loginAnonimoDialog() {
    return this.afAuth.auth.signInAnonymously();
  }

  getAuth() {
    return this.afAuth.authState;
  }

  /* Metodo que comprueba si esta autenticado */
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  /* Metodo para salir de la cuenta */
  logout() {
    return this.afAuth.auth.signOut().then(() => {
      console.log('sign out')
      this.router.navigate(['/login']);
    });
  }

  registerUser(user) {
    // asignas valor ddel formulario a variable
    const usuarioForm = user;
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.correo, user.clave)
        .then(userData => { // una vez que guarda los datos, retrna info desde la bd y eso se envia al metodo
          resolve(userData),
            console.log('usuario creado!');
          this.updateUserData(userData.user, usuarioForm);
        }).catch(err => {
          console.log(reject(err))
          this.alerta.mensajeExito('Error', err);

        })
    });
  }

  actualizarUsuario(user, uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${uid}`);
    return userRef.set(user, { merge: true })
  }
  actualizarImagenUsuario(imagen, uid) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${uid}`);
    return userRef.set({ imagen: imagen }, { merge: true })
  }
  loginFacebookUser() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }
  // Metodo que crea usuario regisrado en firestore
  // el ? al final del valor (usuarioForm?) quiere decir que es una variable opcional que pede recibir la funcion
  private updateUserData(user, usuarioForm?) {
    // si se registra por el formulario de registro asigan valor a la variable formulario,
    // si el login es por fb, google etc. solo se agregan valores como id, email y rol que esta quemado
    const formulario = (usuarioForm) ? usuarioForm : undefined;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
    const data = {
      id: user.uid,
      email: user.email,
      roles: {
        editor: false
      }
    };
    if (formulario) {
      // eliminas correo del obeto para que no se duplique
      delete formulario.correo;
      // agregas valores del formulario de resgistro
      Object.assign(data, formulario);
      console.log('TCL: AuthService -> updateUserData -> formulario', data);
    }
    userRef.set(data, { merge: true }).then(() => {
      this.alerta.mensajeExito('Exito!', 'Usuario creado correctamente');
      this.router.navigate(['/home']);
    });
  }

}



// private updateUserData(user, rol) {
  //   console.log(user)
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${user.uid}`);
  //   const data: UserInterface = {
  //     email: user.email,
  //     rol
  //   }
  //   return userRef.set(data, { merge: true })
  // }
  // isUserAdmin(userUid) {
  //   return this.afs.doc<UserInterface>(`usuario/${userUid}`).valueChanges();
  // }





  // getUser(uid) {
  //   // this.userDoc = afs.doc<Item>('user/david');
  //   this.userDoc = this.afs.doc<UserInterface>(`usuario/${uid}`);
  //   return this.user = this.userDoc.snapshotChanges().pipe(map(action => {
  //     if (action.payload.exists === false) {
  //       return null;
  //     } else {
  //       const data = action.payload.data() as UserInterface;
  //       data.id = action.payload.id;
  //       return data;
  //     }
  //   }));
  // }
  // getRoles() {
  //   this.rolCollection = this.afs.collection<Rol>('roles');
  //   this.roles = this.rolCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Rol;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  //   return this.roles;
  // }
