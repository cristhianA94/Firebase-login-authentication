import { Component} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent{

  persona: Observable<any[]>;
  empresa: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.persona = db.collection('persona').valueChanges();
    this.empresa = db.collection('empresa').valueChanges();
  }

}
