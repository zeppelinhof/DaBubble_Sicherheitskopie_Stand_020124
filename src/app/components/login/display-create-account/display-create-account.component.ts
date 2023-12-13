import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-create-account',
  templateUrl: './display-create-account.component.html',
  styleUrls: ['./display-create-account.component.scss'],
})
export class DisplayCreateAccountComponent {
  arrowBackIsHovered: boolean = false;
  user: User = new User();
  sighUpSuccess: boolean | null = null;

  constructor(private router: Router, private Auth: AuthenticationService) {}

  signUpForm: any = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    agreement: new FormControl(false, [Validators.requiredTrue]),
  });

  submit() {
    if (this.signUpForm.valid || this.signUpForm.get('agreement').value) {
      const { name, email, password } = this.signUpForm.value;
      this.fillUserObject(name, email);
      this.Auth.signUp(name, email, password, this.user);
    }
  }

  fillUserObject(name: string, email: string) {
    this.user.email = email;
    this.user.name = name;
  }
}
