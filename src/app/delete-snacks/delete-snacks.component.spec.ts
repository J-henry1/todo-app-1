import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSnacksComponent } from './delete-snacks.component';

describe('DeleteSnacksComponent', () => {
  let component: DeleteSnacksComponent;
  let fixture: ComponentFixture<DeleteSnacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSnacksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSnacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
