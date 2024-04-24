import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTodoComponent } from './share-todo.component';

describe('ShareTodoComponent', () => {
  let component: ShareTodoComponent;
  let fixture: ComponentFixture<ShareTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
