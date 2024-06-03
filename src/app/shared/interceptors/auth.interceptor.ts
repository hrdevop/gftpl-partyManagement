import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponentComponent } from '../components/error-dialog-component/error-dialog-component.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the remove-token header is present and remove it
    if (req.headers.has('remove-token')) {
      req = req.clone({
        headers: req.headers.delete('remove-token'),
      });
      // Pass the modified request without adding token
      return next.handle(req);
    }

    const token = this.getToken();

    // Add token to the Authorization header if available
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.removeToken();
          this.router.navigateByUrl('/auth');
          this.snackBar.open(
            'Your session has expired. Please log in again.',
            'Close',
            {
              duration: 3000,
            }
          );
        }
        if (error.status !== 200) {
          this.dialog.open(ErrorDialogComponentComponent, {
            data: error.error,
          });
        }
        return throwError(error);
      })
    );
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  private removeToken(): void {
    localStorage.removeItem('token');
  }
}
