import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

import { Food } from '../interfaces/food.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  constructor(private _afs: AngularFirestore) { }

  allFood(): Observable<DocumentChangeAction<unknown>[]> {
    return this._afs.collection('freezer').snapshotChanges();
  }

  addFood(foodItem: Food): Promise<DocumentReference> {
    return this._afs.collection('freezer').add(foodItem)
  }

  deleteFood(id: string): Observable<any> {
    return from(this._afs.doc(`freezer/${id}`).delete());
  }
}
