import { Component } from '@angular/core';
import { FormControl, MinLengthValidator, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  constructor(private todoSvc: TodoService) {
    
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  
  RegisterUser(){
    
    if(!this.emailFormControl.invalid && !this.passwordFormControl.invalid && !this.nameFormControl.invalid){
      this.todoSvc.RegisterUser(this.emailFormControl.value as string, this.passwordFormControl.value as string, this.nameFormControl.value as string);
      console.log("User created");
    }
    else{
      console.log("Failed to create user");
    }
    
  }
}
