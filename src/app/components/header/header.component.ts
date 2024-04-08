import { Component } from '@angular/core';
import { User } from '../../shared/Models/User';
import { UserService } from '../../services/UserService';
import { CartService } from '../../services/CartService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  cartQuantity=0;
  user!:User;
  cart:any=""
  constructor(cartService:CartService,private userService:UserService) {
    userService.userObservable.subscribe((data)=>{
      this.user=data;
    })
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
      this.cart=newCart;
    })
 
  }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.id;
  }
}

