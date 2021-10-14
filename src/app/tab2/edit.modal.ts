import { Food } from './../interfaces/food.model';
import { FoodService } from './../services/food.service';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'edit-modal',
    templateUrl: './edit-modal.html'
})
export class EditModal implements OnInit, OnDestroy {
    @Input() foodId: string;
    foodItem: any;
    sub: Subscription;
    form: FormGroup;

    constructor(private _foodService: FoodService,
                private _modalCtrl: ModalController,
                private _formBuileder: FormBuilder) { }

    
    ngOnInit(): void {
        this.sub = this._foodService.getFood(this.foodId).subscribe(data => {
            this.foodItem = {
                id: data.payload.id,
                ...data.payload.data()
            } as Food;
            this.createForm();
            console.log('this.foodItem: ', this.foodItem);
        }, err => {
            console.error(err);
        })
        
    }
    
    createForm() {
        this.form = this._formBuileder.group({
            foodName: new FormControl(this.foodItem.foodName),
            datePlacedInFreezer: new FormControl(this.foodItem.datePlacedInFreezer)
        })
    }

    goBack() {
        this._modalCtrl.dismiss();
    }
    
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

}