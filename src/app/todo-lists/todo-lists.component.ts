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

  CreateTodos(){
    
    if(this.title.valid && this.publicAccess.valid){
      this.CreateTodo.CreateTodo(this.title.value as string, this.publicAccess.value as unknown as boolean);
    }
    else{
      console.log("Failed to create todo");
    }
  }

}
