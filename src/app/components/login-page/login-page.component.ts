import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/UserService';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  
})
export class LoginPageComponent {
  isSubmitted = false;
  returnUrl = '';
  email:string="";
  password:string="";

  constructor(
     private formBuilder: FormBuilder,
     private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private router:Router) {
      }

formgroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
 



  show() {
    this.isSubmitted = true;
    if (this.formgroup.valid) {      
       this.userService.login({email:this.formgroup.value.email?.toString(),
       password: this.formgroup.value.password?.toString()}).subscribe(() => {
         this.router.navigateByUrl(this.returnUrl);
       });
      this.formgroup.reset();
    } else {
      console.log('Invalid ', "Error:", this.formgroup.get('username')?.['errors']);
    }
  }

}
