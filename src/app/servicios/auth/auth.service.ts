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
  ) {
  }

  loginCorreo(data) {
    return this.afAuth.auth.signInWithEmailAndPassword(data.correo, data.clave).then(value => {
      console.log('Nice, it worked!');
      this.router.navigate(['/dashboard']);
    })
      .catch(err => {
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
    // let rol = user.rol
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.correo, user.clave)
        .then(userData => {
          resolve(userData),
            console.log('usuario creado!');
          this.updateUserData(userData.user);
        }).catch(err => console.log(reject(err)))
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
  // Metodo que crea usuarip regisrado en firestore
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuario/${user.uid}`);
    const data: any = {
      id: user.uid,
      nombres: user.nombre,
      email: user.email,
      roles: {
        editor: false
      }
    }
    return userRef.set(data, { merge: true })
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
