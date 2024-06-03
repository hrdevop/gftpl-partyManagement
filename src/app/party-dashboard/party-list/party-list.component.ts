import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription, map, shareReplay, tap } from 'rxjs';
import { PartyService } from '../party.service';
import { MatDialog } from '@angular/material/dialog';
import { IPartyRes } from '..';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceService } from '../../shared/services/device.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrl: './party-list.component.scss',
})
export class PartyListComponent {
  subscription: Subscription = new Subscription();
  displayedColumns: string[] = [
    'name',
    'companyName',
    'mobileNo',
    'email',
    'actions',
  ];
  @Input({ required: true }) loading: boolean = false;
  @Input({ required: true }) parties!: MatTableDataSource<IPartyRes>;
  @Input({ required: true }) searchTerm: string = '';

  isMobile: boolean = false;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() edit: EventEmitter<IPartyRes['id']> = new EventEmitter<
    IPartyRes['id']
  >();

  constructor(
    private partyService: PartyService,
    private deviceService: DeviceService,
    private snackbar: MatSnackBar
  ) {
    const sub = this.deviceService.isMobile$
      .pipe(
        tap(res => {
          this.isMobile = res;
        })
      )
      .subscribe();

    this.subscription.add(sub);
  }

  editParty(id: IPartyRes['id']) {
    this.edit.emit(id);
  }
  deleteParty(id: IPartyRes['id']) {
    this.partyService
      .delete$(id)
      .pipe(
        tap(() => {
          this.refresh.emit();
          this.snackbar.open('Party deleted successfully', '', {
            duration: 2000,
          });
        })
      )
      .subscribe();
  }
}
