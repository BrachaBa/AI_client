# AI Event Greeting Generator

## Overview
This project is an AI-powered greeting generator designed to create personalized greetings for various events. Users input basic information about the event, and the application uses the OpenAI API to generate a suitable greeting based on their preferences.

## Features
- Personalized Greetings: Generate greetings based on event type, tone, length, and other user preferences.
- Interactive Interface: Allows users to select options and view the generated greeting.
- Dynamic Input: Depending on the chosen event, additional inputs are displayed (e.g., age for birthdays).
- Multiple Options: Users can request a new greeting without re-entering all options.
- Server-Side Testing: Includes meaningful test functions to ensure reliable operation.

## Technologies
- Node.js: JavaScript runtime for server-side development.
- Express.js: Web framework for Node.js.
- OpenAI API: Service for generating text-based content.
- CORS: Middleware for handling Cross-Origin Resource Sharing.

### Installation

1. Clone the Repository:
    git clone <repository-url>
    cd <repository-directory>

2. Install Dependencies
    Ensure you have Node.js installed. Then, install the necessary packages:
    npm install

3. Set Up Environment Variables
    Create a .env file in the root directory of the project and add your OpenAI API key:
    OPENAI_API_KEY=your_openai_api_key_here
    PORT=3000

4. Run the Application
    Start the server:
    npm start

The server will run on http://localhost:3000 by default.

# API Endpoint
'POST /generate-greeting'
Generates a greeting based on the provided user inputs.
Request Body
{
  "eventType": "string",
  "tone": "string",
  "length": "string",
  "language": "string",
  "age": "optional integer"
}

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


