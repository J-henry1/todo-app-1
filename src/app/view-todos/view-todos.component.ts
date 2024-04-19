import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todos/todos';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrl: './view-todos.component.scss',
})
export class ViewTodosComponent {
  
  displayedColumns: string[] = ['title', 'created_at', 'created_by', 'public_list'];
  todos: Todo[] = [];
  dataSource: MatTableDataSource<Todo>;


  constructor(private todoService: TodoService) {
    this.dataSource = new MatTableDataSource<Todo>([]);
  }

  ngOnInit() {
    this.loadTodos();
  }

  async loadTodos() {
    try {
      this.todos = await this.todoService.GetTodos();
      this.dataSource.data = this.todos; 
      return this.todos;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}


