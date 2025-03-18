import { CommonModule, formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../../models/responses/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, ReactiveFormsModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'role', 'delete'];
  userList: User[] = [];
  private formBuilder = inject (FormBuilder);
  userListForm = this.formBuilder.group({
  });
  
  userService: UserService = inject(UserService);
  
  constructor(
    private router: Router
  ) {
    this.userService.getAllUsers().then((userList: User[]) => {
      this.userList = userList;
    });
  }

    
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      complete(){
        console.log("User being deleted: " + id);
      }
    });
    window.location.reload();
  }

  editUser(id: number) {
    console.log("user chosen=" + id);
    this.router.navigateByUrl(`edit-user/${id}`)
  }

  formatDate(date: Date): string {
    return formatDate(date, 'MM-dd-yyyy', 'en-US');
  }

  newUser() {
    this.router.navigateByUrl("new-user");
  }
}
