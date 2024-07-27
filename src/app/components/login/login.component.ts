import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AnimationsService } from 'src/app/shared/services/animations.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterOutlet, RouterLink],
  standalone: true
})
export class LoginComponent {
  constructor(public router: Router, public animations: AnimationsService) {}
}
