# AI Event Greeting Generator

## Overview
This Angular project implements an AI-powered event greeting generator. Users can input details about an event, and the application will generate a customized greeting using AI.

## Features
- Bilingual support (Hebrew and English)
- Event type selection (Birthday, Wedding, Anniversary, Custom)
- Customizable greeting parameters (length, mood)
- Dynamic form based on selected event type
- AI-generated greetings
- Option to regenerate different greetings

## Component Structure

### MainScreenComponent

The main component of the application, `MainScreenComponent`, handles the user interface and interaction logic.

#### Key Properties:
- `event`: Selected event type
- `age`: Age input for birthday events
- `type`: Greeting type (short, long, song, etc.)
- `mood`: Greeting mood (happy, funny, serious, etc.)
- `selectedLanguage`: Current interface language
- `blessing`: Generated greeting text
- `customEvent`, `customMood`, `customType`: For custom user inputs

#### Main Methods:
- `generateBlessing()`: Submits user inputs to generate a greeting
- `requestAnother()`: Clears current greeting for regeneration
- `setLanguage(language: string)`: Switches interface language

## Service Integration

The component uses `GreetingService` to communicate with the backend API for greeting generation.

## User Interface

The UI includes:
- Language selection buttons
- Dynamic form for event details
- Conditional rendering based on user selections
- Greeting display area
- Responsive design with styled background

## Styling

The component uses custom CSS for:
- Page background
- Form container styling
- Responsive layout

## Setup and Running

1. Clone the repository
2. Install dependencies: 
```
npm install
```
3. Start the Angular development server:
```
ng serve
```
4. Open a browser and navigate to `http://localhost:4200`

## Note on Google Sign-In

There's commented-out code for Google Sign-In integration. This feature is not currently active but can be implemented in future versions.

## Future Enhancements
- Activate Google Sign-In feature
- Expand language options
- Add more customization options for greetings

## Contributing
Contributions to improve the application are welcome. Please follow the standard pull request process.
