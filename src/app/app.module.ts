import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateAccountComponent } from './create-account/create-account.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ViewTodosComponent } from './view-todos/view-todos.component';
import { MatTableModule } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { EditUserComponent } from './edit-user/edit-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditDataDialogComponent } from './edit-data-dialog/edit-data-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CreateAccountComponent,
    TodoListsComponent,
    SidenavComponent,
    ViewTodosComponent,
    EditUserComponent,
    EditDataDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Include BrowserAnimationsModule
    FormsModule, // Include FormsModule
    ReactiveFormsModule, // Include ReactiveFormsModule
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
