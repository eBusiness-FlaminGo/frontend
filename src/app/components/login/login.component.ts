import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ROUTES} from '../../app.routes';
import {login} from '../../utils/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [true]
    });
  }

  onSubmit(): void {
    login({username: this.loginForm.value.username, isSetUp: false});
    this.router.navigate([`/${ROUTES.onboarding}`]);
    // if (this.loginForm.valid) {
    //   const {username, password, rememberMe} = this.loginForm.value;
    //   console.log('Login attempt:', {username, password, rememberMe});
    //   // Replace with real authentication logic
    // } else {
    //   console.log('Form is invalid');
    // }
  }

  continueWithFacebook(): void {
    console.log('Continue with Facebook clicked');
  }

  continueWithGoogle(): void {
    console.log('Continue with Google clicked');
  }

  continueWithApple(): void {
    console.log('Continue with Apple clicked');
  }
}
