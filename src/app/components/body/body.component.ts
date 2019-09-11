import { Component} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html'
})
export class BodyComponent{

  title = "Login in Angular with Firebase";
  //Guarda las colecciones en un arreglo de objetos
  persona: Observable<any[]>;
  empresa: Observable<any[]>;
  //Accede a las colecciones de Firebase
  constructor(db: AngularFirestore) {
    this.persona = db.collection('persona').valueChanges();
    this.empresa = db.collection('empresa').valueChanges();
  }

}
