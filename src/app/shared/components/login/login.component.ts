import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { UtilService } from '../../services/util.service';

interface Login {
  userEmail: string;
  userPassword: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: String = 'Login';
  dataSource: Login;

  loginForm = this.formBuilder.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private util: UtilService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
      const form = this.loginForm.value;
      this.authService.login(form).subscribe(
        (data) => {
          if (data) {
            this.router.navigate(['/']);
          } 
        },
        (error) => {
          this.util.showMessage('Ops!!! Algo deu errado.')
          console.log('Ops!!! Algo deu errado.');
        }
      );
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSubmit()
    }
  }

  onReset(): void {
    this.loginForm.reset();
  }
}
