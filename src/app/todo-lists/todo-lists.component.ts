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
  publicAccess = new FormControl('', [Validators.required]);

  

  async CreateTodos() {
    try {
      if (this.title.valid && this.publicAccess.valid) {
        const publicAccessValue = this.parsePublicAccess(this.publicAccess.value as string); // Convert string to boolean
        const response = await this.CreateTodo.CreateTodo(this.title.value as string, publicAccessValue);
        console.log("Todo created:", response);
      } else {
        console.log("Form is not valid. Todo not created.");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  }
  
  //method to convert string to boolean
  private parsePublicAccess(value: string): boolean {
    return value.toLowerCase() === 'true';
  }
}
