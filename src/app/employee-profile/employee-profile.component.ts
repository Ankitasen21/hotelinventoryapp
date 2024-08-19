import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
  standalone: true,
  imports: [CommonModule ]
})
export class EmployeeProfileComponent implements OnInit {
  employee: any = {};
  employeeName: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeName = params['username'];

      this.authService.getUsers().subscribe((data) => {
        this.employee = data.find((employee: any) => employee.username === this.employeeName);
        console.log(this.employee);
      }, (error) => {
        console.error('Error fetching employee data', error);
      });
    });
  }

  editEmployee(user: []): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      height: '400px',
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.editUser(result.id, result.username, result.role, result.salary).subscribe(
          () => {
            this.ngOnInit(); // Reload employee after edit
          },
          (error) => {
            console.error('Error updating employee', error);
          }
        );
      }
    });
  }
  
}
