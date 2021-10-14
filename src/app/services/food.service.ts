import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

import { Food } from '../interfaces/food.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  constructor(private _afs: AngularFirestore) { }

  allFood() {
    return this._afs.collection('freezer').snapshotChanges();
  }

  addFood(foodItem: Food): void {
    // this. _allFood = [foodItem, ...this._allFood];
    // console.log(this._allFood);
  }
}
