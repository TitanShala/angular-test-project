import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {  
  form: FormGroup<LoginForm>; // Declare form property of type FormGroup
  
  constructor(private authService:AuthService,private router: Router,private fb: FormBuilder) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    } );
  }
  
  navigateToHome() {
    this.router.navigate(['']);
  }

  login() {
    if(this.form.invalid)
      return
    
    if(!this.form.value.email || !this.form.value.password){
      return
    }

    this.authService.login(this.form.value['email'], this.form.value.password).subscribe(
      (response) => {
        this.authService.setUser(response.token);        
        this.router.navigate(['']);
        console.log("Response", response);
      },
      (error) => {
        console.log("Error", error);
        
        if(error.error === 'user not found'){
          // show error message
          return
        }

        // show default error message
      }
    );
    // login logic

}
}
