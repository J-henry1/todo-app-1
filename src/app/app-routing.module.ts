import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { ViewTodosComponent } from './view-todos/view-todos.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [

  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path:'Create',
    component: CreateAccountComponent
  },
  {
    path:'Todos',
    component: TodoListsComponent
  },
  {
    path: 'View',
    component: ViewTodosComponent
  },
  {
    path: 'Account',
    component: EditUserComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
