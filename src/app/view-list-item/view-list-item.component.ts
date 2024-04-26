import { Component, Inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo, TodoItems } from '../models/todos/todos';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-view-list-item',
  templateUrl: './view-list-item.component.html',
  styleUrl: './view-list-item.component.scss'
})
export class ViewListItemComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { todo: Todo }, public todoService: TodoService) { }

  todoitems: TodoItems[] = []

  panelOpenState = false;
  
  newTodoTitle = new FormControl('Another thing todo', Validators.required)


  ngOnInit():void {
    this.GetTodoListID(this.data.todo);
  }


  async GetTodoListID(todo: Todo) {
    try {
      let response = await this.todoService.GetTodoList(todo.id);
      console.log(response);
      this.todoitems = response.list_items;
      console.log(this.todoitems);
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  async updateTodoItemStatus(item: TodoItems) {
    try {
      item.completed = !item.completed;
      await this.UpdateTodoItem(item);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async UpdateTodoItem(item: TodoItems) {
    try {
      // Call your service method to update the todo item's status in the database
      let response = await this.todoService.UpdateListItem(item.list_id, item.id, item.completed);
      console.log(response);
      // Optionally, you can handle the response or navigate to another page
    } catch (error) {
      console.error(error);
      // Handle errors if any
    }
  }

}
