import { CommonModule, JsonPipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegistrationService } from '../../../services/registration.service';
import { TournamentService } from '../../../services/tournament.service';
import { Tournament } from '../../../models/responses/tournament';
import { RegisteredPlayer } from '../../../models/registeredPlayer';
import { RegistrationResponse } from '../../../models/responses/registrationResponse';
import { Player } from '../../../models/player';
import { RegistrationRequest } from '../../../models/requests/registrationRequest';

@Component({
  selector: 'app-edit-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatRadioModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './edit-registration.component.html',
  styleUrl: './edit-registration.component.css'
})
export class EditRegistrationComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private formBuilder = inject (FormBuilder)
  editRegistrationForm = this.formBuilder.group({
    tournamentId:[0, Validators.required],
    players: this.formBuilder.array([this.createPlayer()]),
  });
  tournamentList: Tournament[] = [];
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
  registration: RegistrationResponse = {
    tournament: this.tournament,
    playerCount: 0,
    everybodyPaid: false,
    registeredPlayerList: [],
  }
  firstPlayeradded: boolean = false;

  registrationService = inject(RegistrationService);
  tournamentService = inject(TournamentService);

  constructor(
    private router: Router
  ) {
    const tournamentId = parseInt(this.route.snapshot.params['id'], 10);
    this.registrationService.getRegistrationByTournamentId(tournamentId).then((registration: RegistrationResponse) => {
      this.registration = registration;
      this.displayRegistrationPlayers(registration.registeredPlayerList);
    });
    this.tournamentService.getAllTournaments().then((tournamentList: Tournament[]) => {
      this.tournamentList = tournamentList;
    });
    this.displayRegistrationTournamentName(tournamentId);
  }

  get players(): FormArray {
    return this.editRegistrationForm.get("players") as FormArray;
  }

  addPlayer() {
    console.log("In add method")
    this.players.push(this.createPlayer());
  }

  cancel() {
    this.router.navigateByUrl("registration");
  }

  createPlayer(): FormGroup {
    return this.formBuilder.group({
      playerId: [0],
      registeredPlayerId: [0],
      name: ['', Validators.required],
      paid: [''],
      level: ['A', Validators.required]
    })
  }

  deletePlayer(index: number) {
    this.players.removeAt(index);
  }

  saveModifications() {
    console.log("In submit method");
    var modifiedRegisteredPlayerList: RegisteredPlayer [] = [];
    
    for(let player of this.editRegistrationForm.value.players ?? []) {
      var newPlayer: Player = {
        id: player.playerId,
        firstName: "",
        lastName: player.name,
        level: player.level,
        gender: "",
      };
      var newRegisteredPlayer: RegisteredPlayer = {
        id: player.registeredPlayerId,
        paid: player.paid,
        player: newPlayer,
      }
    
      modifiedRegisteredPlayerList.push(newRegisteredPlayer);
    }
    
    let modifiedRegistration: RegistrationRequest = {
      tournamentId: this.editRegistrationForm.value.tournamentId ?? 0,
      registeredPlayerList: modifiedRegisteredPlayerList
    }
    console.log(JSON.stringify(modifiedRegistration));
    this.registrationService.updateRegistration(modifiedRegistration).subscribe(
      data => {
        this.router.navigateByUrl("/registration")
      });
  }

  displayRegistrationTournamentName(tournamentId: number) {
    this.editRegistrationForm.get('tournamentId')!.setValue(tournamentId);
  }

  displayRegistrationPlayers(playerRegistrations: RegisteredPlayer[]) {
    for(let i = 0; i < playerRegistrations.length; i++) {
      if(!this.firstPlayeradded) {
        (this.editRegistrationForm.get('players') as FormArray).patchValue([{ registeredPlayerId: playerRegistrations[i].id, name: playerRegistrations[i].player.lastName, paid: playerRegistrations[i].paid, level: playerRegistrations[i].player.level, playerId: playerRegistrations[i].player.id }]); 
        this.firstPlayeradded = true;
      } else {
        (this.editRegistrationForm.get('players') as FormArray).push(this.formBuilder.group({ registeredPlayerId: playerRegistrations[i].id, name: playerRegistrations[i].player.lastName, paid: playerRegistrations[i].paid, level: playerRegistrations[i].player.level, playerId: playerRegistrations[i].player.id }));
      }
    } 
  }
}
