import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { SharedTodoUser, Todo } from '../models/todos/todos';
import { MatTableDataSource } from '@angular/material/table';
import { EditDataDialogComponent } from '../edit-data-dialog/edit-data-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DeleteSnacksComponent } from '../delete-snacks/delete-snacks.component';
import { FormControl, Validators } from '@angular/forms';
import { ShareTodoComponent } from '../share-todo/share-todo.component';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrl: './view-todos.component.scss',
})
export class ViewTodosComponent {
  
  displayedColumns: string[] = ['title', 'created_at', 'created_by', 'public_list', 'edit', 'delete', 'share'];
  todos: Todo[] = [];
  dataSource: MatTableDataSource<Todo>;


  constructor(private todoService: TodoService, private dialog: MatDialog, private _snackBar: MatSnackBar ) {
    this.dataSource = new MatTableDataSource<Todo>([]);

  }

  sharedUser = new FormControl('', [Validators.required])

  durationInSeconds = 2.5;

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

  openShareDialog(todo: Todo): void{
    const dialogRef = this.dialog.open(ShareTodoComponent, {
      width: '375px',
      data: { todo: todo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //delete todo code
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: this.verticalPosition,
    });
  }

  
  async deleteTodo(todo: Todo) {
    try {
      let response = await this.todoService.DeleteTodo(todo.id);
      this.openSnackBar(`${todo.title} deleted successfully`);
      return response;
    } catch (err) {
      console.error(err);
      this.openSnackBar(`${todo.title} deletion failed`);
      throw err;
    }
  }

  //share todo code

  

  
}


