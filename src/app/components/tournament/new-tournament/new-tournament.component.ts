import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TournamentRequest } from '../../../models/requests/tournamentRequest';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { State } from '../../../models/state';

@Component({
  selector: 'app-new-tournament',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatButtonModule, MatInputModule],
  schemas: [],
  templateUrl: './new-tournament.component.html',
  styleUrl: './new-tournament.component.css'
})
export class NewTournamentComponent {
  private formBuilder = inject(FormBuilder)
  tournamentService = inject(TournamentService);
  stateService = inject(StateService);
  newTournamentForm = this.formBuilder.group({
    tournamentName:["", Validators.required],
    venue:["", Validators.required],
    type:["", Validators.required],
    city:["", Validators.required],
    state:["", Validators.required],
    date:["", Validators.required]
  })
  stateList: State[] = [];

  constructor(
    private router: Router
  ) {
    this.stateList = this.stateService.getStateList();
  }

  cancel() {
    this.router.navigateByUrl("tournament");
  }

  createTournament() {
    console.log("In submit method");
  
    let newTournament: TournamentRequest = {
      id: 0,
      name: this.newTournamentForm.value.tournamentName ?? "",
      type: this.newTournamentForm.value.type ?? "",
      venue: this.newTournamentForm.value.venue ?? "",
      date: this.newTournamentForm.value.date ?? "",
      city: this.newTournamentForm.value.city ?? "",
      state: this.newTournamentForm.value.state ?? "",
      photo: "/assets/dart-board.jpg",
    }
    this.tournamentService.createTournament(newTournament).subscribe(
      data => {
        this.router.navigateByUrl("/tournament")
      }
    );
  }

}
