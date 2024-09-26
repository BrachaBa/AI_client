import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GreetingService } from '../greeting.service';

declare const gapi: any;
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MainScreenComponent implements AfterViewInit {
showAlert() {
throw new Error('Method not implemented.');
}
  event: string = '';
  age: number | null = null;
  type: string = '';
  mood: string = '';
  selectedLanguage: string = 'hebrew'; // שפת ברירת המחדל
  blessing: string | null = null;
  customEvent: string = '';
  customMood: string = '';
  customType: string = '';
loading: any;

  constructor(private greetingService: GreetingService) { }

  // ngAfterViewInit(): void {
  //   this.loadGoogleApi().then(() => {
  //     this.initGoogleSignIn();
  //   });
  // }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.loadGoogleApi();
    }
  }

  loadGoogleApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API script'));
      document.head.appendChild(script);
    });
  }

  initGoogleSignIn(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
      });
    });
  }

  signInWithGoogle(): void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser: any) => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      // כאן תוכל לשלוח את ה-token לשרת שלך ולאמת את המשתמש
    }).catch((error: any) => {
      console.error('Error occurred during Google sign-in:', error);
    });
  }

  generateBlessing(): void {
    const eventType = this.event === 'other' ? this.customEvent : this.event;
    const body: {
      eventType: string,
      length: string,
      tone: string,
      language: string,
      age?: number
    } = { 
      eventType: this.event,
      length: this.type,
      tone: this.mood,
      language: this.selectedLanguage
    };

    // Add age only if the event is a birthday
    if (eventType === 'birthday' && this.age !== null) {
      body.age = this.age;
    }

    this.greetingService.generateGreeting(body)
      .subscribe({
        next: (response) => {
          this.blessing = response.greeting;
        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });


  }  requestAnother(): void {
    this.blessing = ''; // איפוס הברכה
  }

  setLanguage(language: string): void {
    this.selectedLanguage = language; // קביעת השפה הנבחרת במשתנה
    console.log(`Selected language: ${language}`);
  }

  
}