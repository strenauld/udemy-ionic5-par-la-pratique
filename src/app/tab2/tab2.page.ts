import { FoodService } from './../services/food.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  allFoodInFreezer = [];

  constructor(private _foodService: FoodService) {}
  
  ngOnInit(): void {
    this.allFoodInFreezer = this._foodService.allFood;
    console.log('ngOnInit: ', this.allFoodInFreezer);
  }

}
