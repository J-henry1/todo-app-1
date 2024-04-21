import { Component } from '@angular/core';
import { User } from '../models/user/user';
import { TodoService } from '../services/todo.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {

  user: User|undefined;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(private todoService: TodoService){
  }

  async ngOnInit() {
    await this.getUser();
    this.initializeFormControls();
  }

  initializeFormControls() {
    if (this.user) {
      this.emailFormControl.setValue(this.user.email);
      this.passwordFormControl.setValue(this.user.password);
      this.nameFormControl.setValue(this.user.name);
    }
  }

  async getUser(){
    try{
      this.user = await this.todoService.GetUser();
      return this.user;
    }
    catch(err){
      console.error(err);
      return err;
    }
  }//end getUser

  async updateUser(){
    try{
      if(!this.emailFormControl.invalid && !this.passwordFormControl.invalid && !this.nameFormControl.invalid){
        let res = await this.todoService.UpdateUser(this.emailFormControl.value as string, this.passwordFormControl.value as string, this.nameFormControl.value as string);
        console.log(res);
        console.log("User Updated");
      }
      else{
        console.log("Failed to update user");
      }
 }
 catch(err){
  console.error(err);
 }
    

  }

}//end EditUserComponent
