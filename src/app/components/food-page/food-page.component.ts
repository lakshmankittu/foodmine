import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/FoodService';
import { Food } from '../../shared/Models/Food';
import { CartService } from '../../services/CartService';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css'
})
export class FoodPageComponent {
  food!: Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService, private router: Router,private cartService:CartService) {
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
      foodService.getFoodById(params['id']).subscribe(serverFood => {
        this.food = serverFood;
      });
    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
