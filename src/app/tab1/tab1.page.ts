import { FoodService } from './../services/food.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import categories from "../shared/food-categories";
import { Category } from '../interfaces/category.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  form: FormGroup;
  isLoading = false;
  allCategories: Category[] = [];

  constructor(private _foodService: FoodService) {}

  ngOnInit(): void {
    this.allCategories = categories;
    this.form = new FormGroup({
      foodName: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl({
        Validators: [Validators.required]
      }),
      datePlacedInFreezer: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  add(): void {
    this.isLoading = true;
    this._foodService.addFood(this.form.value).then(data => {
      console.log('data:', data);
      this.form.reset();
      this.isLoading = false;
    })
    .catch(err => {
      console.error(err);
      this.isLoading = false;
    })
  }

}
