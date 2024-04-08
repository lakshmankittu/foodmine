import { Injectable } from '@angular/core';
import {CanActivate,Router} from '@angular/router';
import { UserService } from './UserService';
@Injectable({
  providedIn: 'root',
})
export class MemberAuthGuard
  implements CanActivate
{
  constructor(public ss: UserService,private route:Router) {
    ss.userObservable
  }
  canActivate(): boolean {
    let result:boolean =false;
    this.ss.userObservable.subscribe(data=>{
      result=data.id!=null;
      return data;
    },
    error=>{
      return false;
    })
    if(!result) 
    {
      this.route.navigate(['/login'])
    }
    return result;

  }

  
}
