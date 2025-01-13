import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from '../models/responses/tournament';
import { catchError, Observable, of, tap } from 'rxjs';
import { TournamentRequest } from '../models/requests/tournamentRequest';
import { TournamentResponse } from '../models/responses/tournamentResponse';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor (private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    
  url: string = 'http://localhost:8080/tournaments';
  
  async getAllTournaments(): Promise<Tournament[]> {
    const data = await fetch(`${this.url}/tournaments`);
    return (await data.json()) ?? [];
  }

  async getTournamentById(id: number): Promise<Tournament> {
    const data = await fetch(`${this.url}/tournament/${id}`);
    return (await data.json()) ?? {};
  }

  async getUnusedTournaments(): Promise<Tournament[]> {
    const data = await fetch(`${this.url}/tournaments?registrations=0`);
    return (await data.json()) ?? [];
  }

  createTournament(tournament: TournamentRequest): Observable<TournamentResponse> {
    console.log("inside service:  " + JSON.stringify(tournament));
    return this.http.post<TournamentResponse>(`${this.url}/tournament`, tournament, this.httpOptions).pipe(
      tap((tournament: TournamentResponse) => console.log(`added registration w/ id=`)),
      catchError(this.handleError<TournamentResponse>("testing"))
    );
  }

  deleteTournament(tournamentId: number): Observable<string> {
    console.log("inside service:  " + tournamentId);
    return this.http.delete<string>(`${this.url}/tournament/${tournamentId}`).pipe(
      tap((response: string) => console.log(`deleted tournament w/ id=` + response)),
      catchError(this.handleError<string>("testing"))
    );
  }

  updateTournament(tournament: TournamentRequest): Observable<TournamentResponse> {
    console.log("inside service:  " + JSON.stringify(tournament));
    return this.http.patch<TournamentResponse>(`${this.url}/tournament/${tournament.id}`, tournament, this.httpOptions).pipe(
      tap((modifiedTournament: TournamentResponse) => console.log(`added registration w/ id=` + modifiedTournament.id)),
      catchError(this.handleError<TournamentResponse>("testing"))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
