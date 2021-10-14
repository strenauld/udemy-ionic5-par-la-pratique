import { Food } from './../interfaces/food.model';
import { FoodService } from './../services/food.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  sub: Subscription;
  allFoodInFreezer = [];

  constructor(private _foodService: FoodService) {}
  
  ngOnInit(): void {
    this.sub = this._foodService.allFood().subscribe(data => {
      this.allFoodInFreezer = data.map(e => {
        const id = e.payload.doc.id;
        const data = e.payload.doc.data() as Food;
        return { id, ...data };
      })
    }, err => {});
  }

  // Ne sert plus à rien puisqu'on est abonné à la collection de données
  ionViewWillEnter(){
    // this.allFoodInFreezer = this._foodCollection.valueChanges();
  }

}
