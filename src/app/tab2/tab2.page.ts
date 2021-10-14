import { Food } from './../interfaces/food.model';
import { FoodService } from './../services/food.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  sub: Subscription;
  allFoodInFreezer = [];
  isLoading = false;

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

  edit(id) {
    console.log('id:', id);
  }

  delete(id) {
    console.log('id:', id);
    this.isLoading = true;
    this._foodService.deleteFood(id).pipe(
      take(1)
    )
    .subscribe(data => {
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      console.error(err);
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
