import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/UserService';
import { User } from '../shared/Models/User';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user:User=new User();
  constructor(private userService: UserService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
     this.userService.userObservable.subscribe((data)=>this.user=data);
    if(this.user.id)
    {
      request = request.clone({
        setHeaders:{
          userid: this.user.id
        }
      })
    }
    console.log(request);
    return next.handle(request);
  }
}
