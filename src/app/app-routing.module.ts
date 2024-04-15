import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

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
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
