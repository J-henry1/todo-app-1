import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todos/todos';
import { MatTableDataSource } from '@angular/material/table';
import { EditDataDialogComponent } from '../edit-data-dialog/edit-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrl: './view-todos.component.scss',
})
export class ViewTodosComponent {
  
  displayedColumns: string[] = ['title', 'created_at', 'created_by', 'public_list', 'edit', 'delete'];
  todos: Todo[] = [];
  dataSource: MatTableDataSource<Todo>;


  constructor(private todoService: TodoService, private dialog: MatDialog ) {
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

  openDialog(todo: Todo): void{
    const dialogRef = this.dialog.open(EditDataDialogComponent, {
      width: '375px',
      data: { todo: todo } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


