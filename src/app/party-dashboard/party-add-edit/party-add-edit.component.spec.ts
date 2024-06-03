import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyAddEditComponent } from './party-add-edit.component';

describe('PartyAddEditComponent', () => {
  let component: PartyAddEditComponent;
  let fixture: ComponentFixture<PartyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartyAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
