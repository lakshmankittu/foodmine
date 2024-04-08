import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../../services/FoodService';
import { Observable } from 'rxjs';
import { Food } from '../../shared/Models/Food';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../partials/search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[CommonModule]

  
})
export class HomeComponent {
  foods: Food[] = [];
  constructor(private activateroute:ActivatedRoute,private foodserive:FoodService){
    let foodsObservalbe:Observable<Food[]>;
    activateroute.params.subscribe((params) => {
      if (params['searchTerm'])
        foodsObservalbe = this.foodserive.getAllFoodsBySearchTerm(params['searchTerm']);
      else if (params['tag'])
        foodsObservalbe = this.foodserive.getAllFoodsByTag(params['tag']);
      else
        foodsObservalbe = foodserive.getAll();

        foodsObservalbe.subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
    })
  }
  


  
}
