import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advisor } from '../Model/advisor';


@Injectable({
  providedIn: 'root'
})

export class AdvisorService {
  private apiUrl = 'https://localhost:5000/api/advisors';

  constructor(private http: HttpClient) { }

  getAdvisors(): Observable<Advisor[]> {
    return this.http.get<Advisor[]>(this.apiUrl);
  }

  getAdvisor(id: number): Observable<Advisor> {
    return this.http.get<Advisor>(`${this.apiUrl}/${id}`);
  }

  createAdvisor(advisor: Advisor): Observable<Advisor> {
    return this.http.post<Advisor>(this.apiUrl, advisor);
  }

  updateAdvisor(advisor: Advisor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${advisor.id}`, advisor);
  }

  deleteAdvisor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
