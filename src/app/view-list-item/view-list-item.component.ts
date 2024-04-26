import { Component, Inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo, TodoItems } from '../models/todos/todos';
import {MatExpansionModule} from '@angular/material/expansion';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-view-list-item',
  templateUrl: './view-list-item.component.html',
  styleUrl: './view-list-item.component.scss'
})
export class ViewListItemComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { todo: Todo }, public todoService: TodoService) { }

  todoitems: TodoItems[] = []

  panelOpenState = false;


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

}
