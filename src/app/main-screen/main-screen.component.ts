import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GreetingService } from '../greeting.service';
import { send } from 'node:process';

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
  selectedLanguage: string = 'hebrew';
  blessing: string | null = null;
  recipient: string = '';
  sender: string = '';

  customEvent: string = '';
  customMood: string = '';
  customType: string = '';
  loading: any;

  constructor(private greetingService: GreetingService) { }
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
    console.log('Generate Blessing button clicked');
    console.log('Current values:', {
      event: this.event,
      customEvent: this.customEvent,
      mood: this.mood,
      customMood: this.customMood,
      type: this.type,
      customType: this.customType,
      age: this.age,
      selectedLanguage: this.selectedLanguage,
      recipient: this.recipient,
      sender: this.sender
    });

    const body: any = {
      eventType: this.event === 'other' ? this.customEvent : this.event,
      tone: this.mood === 'other' ? this.customMood : this.mood,
      length: this.type === 'other' ? this.customType : this.type,
      language: this.selectedLanguage,
      recipient: this.recipient,
      sender: this.sender
    };

    if (this.event === 'birthday' && this.age !== null) {
      body.age = this.age;
    }

    console.log('Sending request body:', body);
    // alert('body: ' + JSON.stringify(body));

    this.greetingService.generateGreeting(body)
      .subscribe({
        next: (response) => {
          console.log('Received response:', response);
          this.blessing = response.greeting;
        },

        error: (error) => {
          console.error('Error occurred:', error);
        }
      });
  }

  requestAnother(): void {
    this.blessing = ''; // איפוס הברכה
  }

  setLanguage(language: string): void {
    this.selectedLanguage = language; // קביעת השפה הנבחרת במשתנה
    console.log(`Selected language: ${language}`);
  }
}