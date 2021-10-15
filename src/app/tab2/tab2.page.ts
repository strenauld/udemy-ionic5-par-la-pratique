import { Food } from '../interfaces/food.interface';
import { FoodService } from './../services/food.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators'
import { AlertController, ModalController } from '@ionic/angular';
import { EditModal } from './edit.modal';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  sub: Subscription;
  allFoodInFreezer = [];
  isLoading = false;

  constructor(private _foodService: FoodService,
              private _modalCtrl: ModalController,
              private _alertCltr: AlertController) {}
  
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

  async edit(id) {
    console.log('id:', id);
    const modal = await this._modalCtrl.create({
      component: EditModal,
      componentProps: { 'foodId': id }
    });
    return await modal.present();
  }

  async delete(id) {
    console.log('id:', id);
    this.isLoading = true;

    const alert = await this._alertCltr.create({
      header: "Delete this food ?",
      subHeader: "Deletion is irreversible",
      buttons: [
        {
          text: "Cancel",
          cssClass: "primary",
          role: "cancel",
          handler: () => {
            this.isLoading = false;
          }
        },
        {
          text: "Delete",
          cssClass: "danger",
          handler: () => {
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
        }
      ]
    })
    
    alert.present();

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
