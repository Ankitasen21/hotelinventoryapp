import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css',
})
export class UserEditDialogComponent {
  isOtherRole: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: number;
      username: string;
      role: string;
      password: string;
      salary: number;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRoleChange(event: any): void {
    if (event.value === 'other') {
      this.isOtherRole = true;
     // Clear the role so the user can enter a custom one
    } else {
      this.isOtherRole = false;
    }
  }
}
