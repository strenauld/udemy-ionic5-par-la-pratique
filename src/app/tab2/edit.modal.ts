import { Food } from './../interfaces/food.model';
import { FoodService } from './../services/food.service';
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController, ToastController } from '@ionic/angular';
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
                private _formBuileder: FormBuilder,
                private _toastCtrl: ToastController) { }

    
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
            foodName: new FormControl(this.foodItem.foodName, {
                validators: [Validators.required]
            }),
            datePlacedInFreezer: new FormControl(this.foodItem.datePlacedInFreezer, {
                validators: [Validators.required]
            })
        })
    }

    update() {
        console.log(this.form);
        const updatedFood= { ... this.form.value, id: this.foodItem.id };
        this._foodService.updateFood(updatedFood).subscribe(async () => {
            const toast = await this._toastCtrl.create({
                message: "update is successful",
                duration: 1500,
                color: "primary",
                position: "middle"
            });
            toast.present();
        });

    }

    goBack() {
        this._modalCtrl.dismiss();
    }
    
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

}