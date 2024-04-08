import { Component } from '@angular/core';
import { FoodService } from '../../../services/FoodService';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags?:string[];
  constructor(foodService:FoodService) {
    foodService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
   }

}
