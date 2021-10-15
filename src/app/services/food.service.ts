import { Action, AngularFirestore, DocumentChangeAction, DocumentReference, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

import { Food } from '../interfaces/food.interface';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  constructor(private _afs: AngularFirestore) { }

  allFood(): Observable<DocumentChangeAction<unknown>[]> {
    return this._afs.collection('freezer').snapshotChanges();
  }

  getFood(id: string): Observable<Action<DocumentSnapshot<{}>>> {
    return this._afs.collection('freezer').doc(id).snapshotChanges();
  }

  addFood(foodItem: Food): Promise<DocumentReference> {
    return this._afs.collection('freezer').add(foodItem)
  }

  updateFood(food: Food): Observable<any> {
    return from(this._afs.doc(`freezer/${food.id}`).update(food));
  }

  deleteFood(id: string): Observable<any> {
    return from(this._afs.doc(`freezer/${id}`).delete());
  }
}
