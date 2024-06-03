import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog-component',
  templateUrl: './error-dialog-component.component.html',
  styleUrl: './error-dialog-component.component.scss',
})
export class ErrorDialogComponentComponent {
  errorMessages: { field: string; message: string }[] = [];
  errorSubtitle: string = 'Validation Errors';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { error: Array<any>; msg: string }
  ) {
    this.parseErrors(data.error);
    this.errorSubtitle = data?.msg;
  }

  parseErrors(errors: any): void {
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        errors[field].forEach((message: string) => {
          this.errorMessages.push({ field, message });
        });
      }
    }
  }
}
