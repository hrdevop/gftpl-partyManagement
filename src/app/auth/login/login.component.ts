import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  logging: boolean = false;
  onSubmit() {
    if (this.loginForm.valid) {
      this.logging = true;
      const formValues = this.loginForm.value;
      this.authService
        .login$(formValues)
        .pipe(
          tap(res => {
            if (res.token) {
              this.router.navigateByUrl('party');
            }
          }),
          finalize(() => {
            this.logging = false;
          })
        )
        .subscribe();
    }
  }

  hidePassword = true;
  passwordToggle(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
  }
}
