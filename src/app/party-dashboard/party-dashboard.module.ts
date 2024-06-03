import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PartyListComponent } from './party-list/party-list.component';
import { PartyAddEditComponent } from './party-add-edit/party-add-edit.component';
import { MaterialModule } from '../shared/modules/material.module';
import { RouterModule } from '@angular/router';
import { PartyDashboardComponent } from './party-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '@pipes/pipe.module';

@NgModule({
  declarations: [
    PartyListComponent,
    PartyAddEditComponent,
    PartyDashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: PartyDashboardComponent },
    ]),
  ],
  providers: [DatePipe],
})
export class PartyDashboardModule {}
