import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TournamentService } from '../../../services/tournament.service';
import { Tournament } from '../../../models/responses/tournament';
import { StateService } from '../../../services/state.service';
import { State } from '../../../models/state';
import { TournamentRequest } from '../../../models/requests/tournamentRequest';

@Component({
  selector: 'app-edit-tournament',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatGridListModule, MatSelectModule, MatButtonModule, MatInputModule],
  schemas: [],
  templateUrl: './edit-tournament.component.html',
  styleUrl: './edit-tournament.component.css'
})
export class EditTournamentComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private formBuilder = inject (FormBuilder)
  tournamentService = inject(TournamentService);
  stateService = inject(StateService)
  editTournamentForm = this.formBuilder.group({
    id: [0],
    tournamentName:["", Validators.required],
    venue:["", Validators.required],
    type:["", Validators.required],
    city:["", Validators.required],
    state:["", Validators.required],
    date:["", Validators.required]
  })
  tournament: Tournament = {
    id: 0,
    name: '',
    date: '',
    type: '',
    venue: '',
    city: '',
    state: '',
    photo: ''
  }
  stateList: State[] = [];
  
  constructor(
    private router: Router
  ) {
    const tournamentId = parseInt(this.route.snapshot.params['id'], 10);
    this.tournamentService.getTournamentById(tournamentId).then((tournament: Tournament) => {
      this.tournament = tournament;
      this.displayTournament(tournament);
    });
    this.stateList = this.stateService.getStateList();
  }
  
  /*addPlayer() {
    console.log("In add method")
    this.players.push(this.createPlayer());
  }*/
  
  cancel() {
    this.router.navigateByUrl("tournament");
  }
  
  displayTournament(tournament: Tournament) {
    this.editTournamentForm.patchValue({
      id: tournament.id,
      tournamentName: tournament.name,
      venue: tournament.venue,
      type: tournament.type,
      city: tournament.city,
      state: tournament.state,
      date: tournament.date
    });
  }

  saveModifications() {
    console.log("In submit method");
      
    let newTournament: TournamentRequest = {
      id: this.editTournamentForm.value.id ?? 0,
      name: this.editTournamentForm.value.tournamentName ?? "",
      type: this.editTournamentForm.value.type ?? "",
      venue: this.editTournamentForm.value.venue ?? "",
      date: this.editTournamentForm.value.date ?? "",
      city: this.editTournamentForm.value.city ?? "",
      state: this.editTournamentForm.value.state ?? "",
      photo: "/assets/dart-board.jpg",
    }
    this.tournamentService.updateTournament(newTournament).subscribe(
      data => {
        this.router.navigateByUrl("/tournament")
      })
  }
}
