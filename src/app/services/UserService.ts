import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Authresult, User } from '../shared/Models/User';
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

  login(userLogin: IUserLogin): Observable<Authresult> {
    console.log("userLogin", userLogin);
    return this.http.post<Authresult>("http://localhost:5211/api/users/login", userLogin).pipe(
      tap({
        next: (user) => {
          console.log(user);
          if(user.result){
            this.setUserToLocalStorage(user.user,user.token);
            this.userSubject.next(user.user);
            }
            else{
              window.alert(user.errors +' Login Failed1')
            }
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
  
  register(userRegiser:IUserRegister): Observable<Authresult>{
    return this.http.post<Authresult>("http://localhost:5211/api/users/register", userRegiser).pipe(
      tap({
        next: (user) => {
          if(user.result){
          this.setUserToLocalStorage(user.user,user.token);
          this.userSubject.next(user.user);
          }
          else{
            window.alert(user.errors.toLocaleString() +' Register Failed')
          }
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
    localStorage.removeItem("Token");
    window.location.reload();
  }

  private setUserToLocalStorage(user:User, token:string){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem("Token",token);
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
