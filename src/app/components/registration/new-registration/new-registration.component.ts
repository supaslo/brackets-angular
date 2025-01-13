import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RegistrationService } from '../../../services/registration.service';
import { TournamentService } from '../../../services/tournament.service';
import { Tournament } from '../../../models/responses/tournament';
import { RegistrationRequest } from '../../../models/requests/registrationRequest';
import { Player } from '../../../models/player';
import { RegisteredPlayer } from '../../../models/registeredPlayer';

@Component({
  selector: 'app-new-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatGridListModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatRadioModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './new-registration.component.html',
  styleUrl: './new-registration.component.css'
})
export class NewRegistrationComponent {
  private formBuilder = inject (FormBuilder)
  registrationForm = this.formBuilder.group({
    tournamentId:[0, Validators.required],
    players: this.formBuilder.array([this.createPlayer()]),
  });
  tournamentList: Tournament[] = [];
  registrationService = inject(RegistrationService);
  tournamentService = inject(TournamentService);

  get players(): FormArray {
    return this.registrationForm.get("players") as FormArray;
  }

  constructor(
    private router: Router
  ) {
    this.tournamentService.getUnusedTournaments().then((tournamentList: Tournament[]) => {
      this.tournamentList = tournamentList;
    });
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
      name: ['', Validators.required],
      paid: [''],
      level: ['A', Validators.required]
    })
  }

  deletePlayer(index: number) {
    this.players.removeAt(index);
  }

  createRegistration() {
    console.log("In submit method");
    var newPlayerList: Player [] = [];
    var newRegisteredPlayerList: RegisteredPlayer [] = [];

    for(let player of this.registrationForm.value.players ?? []) {
      var newPlayer: Player = {
        id: 0,
        firstName: "",
        lastName: player.name,
        level: player.level,
        gender: "",
      };
      var newRegisteredPlayer: RegisteredPlayer = {
        id: 0,
        paid: player.paid,
        player: newPlayer,
      }

      newRegisteredPlayerList.push(newRegisteredPlayer);
    }

    let newRegistration: RegistrationRequest = {
      tournamentId: this.registrationForm.value.tournamentId ?? 0,
      registeredPlayerList: newRegisteredPlayerList
    }
    this.registrationService.createRegistration(newRegistration).subscribe(
      data => {
        this.router.navigateByUrl("/registration")
      }
    );
  }
}
