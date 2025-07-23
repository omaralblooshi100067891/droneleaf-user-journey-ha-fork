import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {

  loginForm: FormGroup;
  rememberMe = false;

  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
       rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const data = {
        ...this.loginForm.value,
        rememberMe: this.rememberMe,
      };
      console.log('Login data:', data);
      // 🔐 Call login API here
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
