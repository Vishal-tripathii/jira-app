import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Roles } from '../../../shared/constants/roles';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  returnURL = ''

  constructor(private _fb: FormBuilder, private _activatedRoute: ActivatedRoute, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.returnURL = this._activatedRoute.snapshot.queryParams.returnURL
  }

  get fc() {
    return this.loginForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this._userService.login({ email: this.fc.email.value, password: this.fc.password.value }).subscribe((resp: any) => {
      resp.role === Roles.ADMIN ? this._router.navigate(['/admin-page']) : this._router.navigate(['/home-page'])
    })


  }
}
