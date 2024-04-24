import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SharedTodoUser, Todo } from '../models/todos/todos';
import { TodoService } from '../services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-share-todo',
  templateUrl: './share-todo.component.html',
  styleUrl: './share-todo.component.scss'
})
export class ShareTodoComponent {

  sharedUser: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { todo: Todo }, private updateTodo: TodoService) {
    console.log(data);
    this.sharedUser = new FormControl('', [Validators.required, Validators.email]);
  }

  
  async ShareTodo() {
    try {
      const sharedUserEmail = this.sharedUser.value;
      if (sharedUserEmail) { 
        const sharedUser = new SharedTodoUser(sharedUserEmail);
        let response = await this.updateTodo.ShareTodo(this.data.todo.id, sharedUser);
        return response;
      } else {
        throw new Error('No shared user email specified');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


}
