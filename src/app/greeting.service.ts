import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {
  // private apiUrl = 'http://localhost:3000/generate-greeting';
  private apiUrl = 'https://ai-server-k26q.onrender.com/generate-greeting';

  constructor(private http: HttpClient) { }

  generateGreeting(body :any): Observable<any> {
    console.log('Sending request:', body); // Log for checking
    return this.http.post<any>(this.apiUrl, body);
  }
}
