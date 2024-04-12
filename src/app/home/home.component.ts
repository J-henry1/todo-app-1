import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  emailFormControl = new FormControl('test@test.com', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('test', [Validators.required, Validators.minLength(4)]);
}
