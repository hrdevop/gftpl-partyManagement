import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { PartyService } from './party.service';
import { Component, OnInit } from '@angular/core';
import { IPartyRes } from '.';
import { finalize, Subscription, tap } from 'rxjs';
import { DeviceService } from '../shared/services/device.service';
import { MatDialog } from '@angular/material/dialog';
import { PartyAddEditComponent } from './party-add-edit/party-add-edit.component';

@Component({
  selector: 'app-party-dashboard',
  templateUrl: './party-dashboard.component.html',
  styleUrl: './party-dashboard.component.scss',
})
export class PartyDashboardComponent implements OnInit {
  subscription: Subscription = new Subscription();
  isMobile: boolean = false;

  constructor(
    private partyService: PartyService,
    private deviceService: DeviceService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
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

  ngOnInit(): void {
    this.getPartyData();
  }

  parties: MatTableDataSource<IPartyRes> = new MatTableDataSource<IPartyRes>();
  loading: boolean = false;
  getPartyData() {
    this.loading = true;
    this.partyService
      .get$()
      .pipe(
        tap(res => {
          this.parties.data = res;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.parties.filter = filterValue.trim().toLowerCase();
  }

  addParty() {
    const dialog = this.dialog.open(PartyAddEditComponent, {
      maxWidth: '95vw',
    });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.getPartyData();
      }
    });
  }

  editParty(id: IPartyRes['id']) {
    const dialog = this.dialog.open(PartyAddEditComponent, {
      maxWidth: '95vw',
      data: id,
    });
    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.getPartyData();
      }
    });
  }
  loggingOut: boolean = false;
  onLogout() {
    this.loggingOut = true;
    this.authService
      .logout$()
      .pipe(
        tap(res => {
          if (res?.status) {
            this.loggingOut = false;
            this.router.navigateByUrl('auth/login');
          }
        })
      )
      .subscribe();
  }
}
