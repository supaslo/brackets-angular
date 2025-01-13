import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { RegistrationService } from '../../../services/registration.service';
import { RegistrationResponse } from '../../../models/responses/registrationResponse';

@Component({
  selector: 'app-registrations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatIconModule, MatButtonModule, MatListModule],
  schemas: [],
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.css'
})
export class RegistrationsComponent implements OnChanges{
  displayedColumns: string[] = ['name', 'count', 'paid', 'date', 'delete'];
  registrationList: RegistrationResponse[] = [];
  private formBuilder = inject (FormBuilder);
  registrationListForm = this.formBuilder.group({
  });

  registrationService: RegistrationService = inject(RegistrationService);

  constructor(
    private router: Router
  ) {
    this.registrationService.getAllRegistrations().then((registrationList: RegistrationResponse[]) => {
      this.registrationList = registrationList;
    });
  }

  newRegistration() {
    this.router.navigateByUrl("new-registration");
  }

  deleteRegistration(id: number) {
    this.registrationService.deleteRegistration(id).subscribe({
      complete(){
        console.log("Person being deleted: " + id);
      }
    });
    window.location.reload();
  }

  editRegistration(id: number) {
    console.log("tournament chosen=" + id);
    this.router.navigateByUrl(`edit-registration/${id}`)
  }

  formatDate(date: Date): string {
    return formatDate(date, 'MM-dd-yyyy', 'en-US');
  }

  ngOnChanges(): void {
    this.registrationService.getAllRegistrations().then((registrationList: RegistrationResponse[]) => {
      this.registrationList = registrationList;
    });
  }

}
