import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDashboardComponent } from './party-dashboard.component';

describe('PartyDashboardComponent', () => {
  let component: PartyDashboardComponent;
  let fixture: ComponentFixture<PartyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartyDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
