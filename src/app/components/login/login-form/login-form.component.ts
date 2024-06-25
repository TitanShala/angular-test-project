import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})

export class LoginFormComponent {  
  form: FormGroup<LoginForm>; // Declare form property of type FormGroup
  errorMessage: string = '';

  constructor(private authService:AuthService,private router: Router,private fb: FormBuilder, private messageService: MessageService) { 
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
        this.showSuccess("Login successful");
        this.authService.setUser(response.token); 
        setTimeout(()=>{
          this.router.navigate(['']);
        },500)

        console.log("Response", response);

      },
      (error) => {
        console.log("Error", error);
        
        if(error.error.error === 'user not found'){
          this.errorMessage = 'Invalid credentials';
          this.showError('Invalid credentials');
          return
        }

        // show default error message
        this.errorMessage = 'An error occurred, please try again!';
        this.showError('An error occurred, please try again!');

      }
    );
  }

  showSuccess(text:string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }

  showError(text:string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }
}
