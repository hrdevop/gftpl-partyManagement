import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDialogComponentComponent } from './error-dialog-component.component';

describe('ErrorDialogComponentComponent', () => {
  let component: ErrorDialogComponentComponent;
  let fixture: ComponentFixture<ErrorDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDialogComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
