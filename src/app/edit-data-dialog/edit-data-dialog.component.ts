import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todos/todos';

@Component({
  selector: 'app-edit-data-dialog',
  templateUrl: './edit-data-dialog.component.html',
  styleUrl: './edit-data-dialog.component.scss'
})
export class EditDataDialogComponent {


  title: FormControl;
  publicAccess: FormControl;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: { todo: Todo }, private updateTodo: TodoService) {
    console.log(data);
    this.title = new FormControl(data.todo.title, [Validators.required]);
    this.publicAccess = new FormControl(data.todo.public_list, [Validators.required]);
  }


  async EditTodo(){

    try {
    
      await this.updateTodo.UpdateTodo(this.data.todo.id, this.title.value as string, this.publicAccess.value as boolean);
      console.log('Todo updated successfully');
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  }

}
