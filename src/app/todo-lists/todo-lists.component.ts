import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrl: './todo-lists.component.scss'
})
export class TodoListsComponent {

  constructor(private CreateTodo: TodoService) {
    
  }

  title = new FormControl('', [Validators.required])
  publicAccess = new FormControl(false);

  

  async CreateTodos() {
    try {
      if (this.title.valid && this.publicAccess.valid) {
        // Convert string to boolean
        const response = await this.CreateTodo.CreateTodo(this.title.value as string, this.publicAccess.value as boolean);
        console.log("Todo created:", response);
      } else {
        console.log("Form is not valid. Todo not created.");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }
  }
