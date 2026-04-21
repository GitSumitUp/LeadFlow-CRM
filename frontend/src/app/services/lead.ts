import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lead } from '../shared/models/lead';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = 'http://localhost:3000/api/leads';

  constructor(private http: HttpClient) {}

  addLead(lead: Lead): Observable<Lead>{
    return this.http.post<Lead>(`${this.apiUrl}/add`, lead);
  }

  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${this.apiUrl}/all`);
  }

  updateLeadStatus(id: number, status: 'new' | 'contacted' | 'closed'): Observable<Lead> {
    return this.http.put<Lead>(`${this.apiUrl}/${id}`, { status });
  }

  deleteLead(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


