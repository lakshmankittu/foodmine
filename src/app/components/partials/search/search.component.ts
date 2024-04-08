import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = '';
  constructor(private router:Router) {}
  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+ term);
  }
}
