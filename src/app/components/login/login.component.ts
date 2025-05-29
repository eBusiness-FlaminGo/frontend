import {Router} from '@angular/router';
import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ROUTES} from '../../app.routes';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showInvalidLoginModal = false;
  errorMessage = 'Invalid email or password. Please try again.';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [true]
    });
  }

  ngOnInit(): void {
    if (this.userService.getUserProfile() !== null) {
      this.router.navigate([`/${ROUTES.facts}`]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.userService.loadUserProfile(username, password);
      this.userService.setLoginState(true)
      this.router.navigate([`/${ROUTES.onboarding}`]);
    } else {
      this.openModal();
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  openModal(): void {
    this.showInvalidLoginModal = true;
    this.renderer.addClass(document.body, 'overflow-hidden');
  }

  closeModal(): void {
    this.showInvalidLoginModal = false;
    this.renderer.removeClass(document.body, 'overflow-hidden');
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
