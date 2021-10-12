import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private _allFood = [];

  get allFood() {
    return this._allFood;
  }

  constructor() { }

  addFood(foodItem): void {
    this. _allFood = [foodItem, ...this._allFood];
    console.log(this._allFood);
  }
}
