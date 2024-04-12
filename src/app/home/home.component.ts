import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private loginUser: TodoService) {
    
  }

  emailFormControl = new FormControl('test@test.com', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('test', [Validators.required, Validators.minLength(4)]);

  LoginUser(){
    if(!this.emailFormControl.invalid && !this.passwordFormControl.invalid){
      this.loginUser.LoginUser(this.emailFormControl.value as string, this.passwordFormControl.value as string);
    }
    else{
      console.log("Failed to login user");
    }
  }
}
