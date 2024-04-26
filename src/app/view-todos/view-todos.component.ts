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
import { ViewListItemComponent } from '../view-list-item/view-list-item.component';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrl: './view-todos.component.scss',
})
export class ViewTodosComponent {
  
  displayedColumns: string[] = ['title', 'created_at', 'created_by', 'public_list', 'edit', 'delete', 'share'];//array of columns for view Todos
  todos: Todo[] = [];//Todo object Array
  dataSource: MatTableDataSource<Todo>;//datasource used for binding the table data to the todo object


  //constructor for Todo Service, Dialog Box, and Snack Bar
  constructor(private todoService: TodoService, private dialog: MatDialog, private _snackBar: MatSnackBar ) {
    this.dataSource = new MatTableDataSource<Todo>([]);

  }

  //shared user validator for storing user input on shared-todo html input field
  sharedUser = new FormControl('', [Validators.required])

  //variable for setting seconds in snackbar
  durationInSeconds = 2.5;

  //calls the load todos on application initialization phase of component lifecycle
  ngOnInit() {
    this.loadTodos();
  }

  //method for retrieving todos from backend TodoServce
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

  //opens the edit data dialog box - utilizes services from the MatDialog import
  openDialog(todo: Todo): void{
    const dialogRef = this.dialog.open(EditDataDialogComponent, {
      width: '450px',
      data: { todo: todo } 
    });

  }

  //opens the share todo dialog box - utilizes services from the MatDialog import
  //the data object is passed into the share todo component which is part of the constuctor in share-tod as injection
  openShareDialog(todo: Todo): void{
    const dialogRef = this.dialog.open(ShareTodoComponent, {
      width: '375px',
      data: { todo: todo }
    });

  }

  //delete todo code
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  //method for opening snackbar - utilizes services from the MatSnackBar import
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: this.durationInSeconds * 1000,
      verticalPosition: this.verticalPosition,
    });
  }

  
  openTodoListDialog(todo: Todo): void{
    const dialogRef = this.dialog.open(ViewListItemComponent, {
      width: '450px',
      data: { todo: todo } 
    });
  }

  //method for deleting todo from backend TodoService
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



  

  
}


