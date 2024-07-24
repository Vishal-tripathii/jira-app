import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { Roles } from '../../../shared/constants/roles';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit {
  registerPage!: FormGroup;
  isSubmitted = false;  
  roleValues = Object.values(Roles); // fetching the values of roles

  constructor(private _fb: FormBuilder, private _userService: UserService, private _activatedRoutes: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.registerPage = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', [Validators.required]]
    })
  }

  get fc() {
    return this.registerPage.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerPage.invalid) return;

    const formValue = this.registerPage.value;
    const Newuser: IUserRegister = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role
    }
    this._userService.register(Newuser).subscribe({
      next: (newUser) => {
        this._router.navigate(['/login-page'])
      },
      error: (error) => {
        console.log("Error in register!", error);
        this.registerPage.reset();
        
      }
    })
  }


}
