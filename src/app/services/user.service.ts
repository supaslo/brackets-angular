import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/responses/user';
import { UserRequest } from '../models/requests/userRequest';
import { UserResponse } from '../models/responses/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private http: HttpClient) { }
    
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
      
  url: string = 'http://localhost:8080/users';
    
  async getAllUsers(): Promise<User[]> {
    const data = await fetch(`${this.url}/users`);
    return (await data.json()) ?? [];
  }
  
  async getUserById(id: number): Promise<User> {
    const data = await fetch(`${this.url}/user/${id}`);
    return (await data.json()) ?? {};
  }
  
  createUser(user: UserRequest): Observable<UserResponse> {
    console.log("inside service:  " + JSON.stringify(user));
    return this.http.post<UserResponse>(`${this.url}/user`, user, this.httpOptions).pipe(
      tap((user: UserResponse) => console.log(`added registration w/ id=`)),
      catchError(this.handleError<UserResponse>("testing"))
    );
  }
  
  deleteUser(userId: number): Observable<string> {
    console.log("inside service:  " + userId);
    return this.http.delete<string>(`${this.url}/user/${userId}`).pipe(
      tap((response: string) => console.log(`deleted user w/ id=` + response)),
      catchError(this.handleError<string>("testing"))
    );
  }
  
  updateUser(user: UserRequest): Observable<UserResponse> {
    console.log("inside service:  " + JSON.stringify(user));
    return this.http.patch<UserResponse>(`${this.url}/user/${user.id}`, user, this.httpOptions).pipe(
      tap((modifiedUser: UserResponse) => console.log(`added user w/ id=` + modifiedUser.id)),
      catchError(this.handleError<UserResponse>("testing"))
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
