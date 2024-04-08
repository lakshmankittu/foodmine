import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/Models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
  
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  get currentUser(){
    return this.userSubject.value;
  }
  constructor(private http:HttpClient) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    console.log("userLogin", userLogin);
    return this.http.post<User>("http://localhost:5211/api/users/login", userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        },
        error: (errorResponse) => {
          console.error(errorResponse);
          let errorMessage = 'An error occurred';
          if (errorResponse.error && errorResponse.error.message) {
            errorMessage = errorResponse.error.message;
          }
          window.alert(errorMessage +' Login Failed');
          throw errorResponse; // Re-throw the error to propagate it to the subscriber
        }
      })
    );
  }
  
  register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>("http://localhost:5211/api/users/register", userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
         
        },
        error: (errorResponse) => {
          window.alert(errorResponse.error+' Register Failed')
        }
      })
    )
  }


  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
