import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/UserService';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRegister } from '../../shared/Interfaces/IUserRegister';
import { InputValidationComponent } from '../partials/input-validation/input-validation.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  
})
export class RegisterPageComponent {
  registerForm!:FormGroup;
  isSubmitted = false;
  
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required]]
    });

 
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid){ 
      console.log(this.registerForm);
      return;}

    const fv= this.registerForm.value;
    const user :IUserRegister = {
      id:"sample",
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address,
      isAdmin:false
    };
    

    this.userService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
