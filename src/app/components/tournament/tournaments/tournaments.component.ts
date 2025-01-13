import { Component, inject } from '@angular/core';
import { Tournament } from '../../../models/responses/tournament';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TournamentService } from '../../../services/tournament.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatIconModule, MatButtonModule],
  schemas: [],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  displayedColumns: string[] = ['name', 'venue', 'type', 'date', 'delete'];
  tournamentList: Tournament[] = [];
  private formBuilder = inject (FormBuilder);
  tournamentListForm = this.formBuilder.group({
  });
  
  tournamentService: TournamentService = inject(TournamentService);
  
  constructor(
    private router: Router
  ) {
    this.tournamentService.getAllTournaments().then((tournamentList: Tournament[]) => {
      this.tournamentList = tournamentList;
    });
  }

    
  deleteTournament(id: number) {
    this.tournamentService.deleteTournament(id).subscribe({
      complete(){
        console.log("Tournament being deleted: " + id);
      }
    });
    window.location.reload();
  }

  editTournament(id: number) {
    console.log("tournament chosen=" + id);
    this.router.navigateByUrl(`edit-tournament/${id}`)
  }

  formatDate(date: Date): string {
    return formatDate(date, 'MM-dd-yyyy', 'en-US');
  }

  newTournament() {
    this.router.navigateByUrl("new-tournament");
  }
}
