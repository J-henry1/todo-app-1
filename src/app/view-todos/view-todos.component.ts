import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrl: './view-todos.component.scss',
  standalone: true,
  imports: [MatTabsModule]
})
export class ViewTodosComponent {

}
