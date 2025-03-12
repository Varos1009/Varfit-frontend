# VarFit

This repository contains the frontend application for Varfit, a fitness platform that helps users track their workouts, progress, and weight. The app uses Firebase Authentication for user login and registration, and connects to an external API to fetch and store data.

## Features

- Firebase Authentication
- User registration and login
- Workout tracking
- Exercise selection
- Plan and schedule workouts
- Weight tracking
- Progress tracking
- External API integration


## Technologies Used

- React + Vite
- Tailwind CSS
- Firebase Authentication
- Axios
- External API
- React Router
- Recharts
- Calendar

## Installation

1. Clone the repository
```
git clone https://github.com/Varos1009/Varfit.git
```
2. Navigate into the project directory
```
cd Varfit
``` 
3. Install dependencies
```
npm install
```
4.Environment configuration
You need to configure the app with your Firebase and external API keys.

Create a .env file in the root directory of the project and add the following variables:
- VITE_FIREBASE_API_KEY: <your Firebase API key>
- VITE_FIREBASE_AUTH_DOMAIN: <your Firebase auth domain>
- VITE_FIREBASE_PROJECT_ID: <your Firebase project ID>
- VITE_FIREBASE_STORAGE_BUCKET: <your Firebase storage bucket>
- VITE_FIREBASE_MESSAGING_SENDER_ID: <your Firebase messaging sender ID>
- VITE_FIREBASE_APP_ID: <your Firebase app ID>
- VITE_FIREBASE_MEASUREMENT_ID: <your Firebase measurement ID>

- VITE_RAPID_API_KEY: <your external API key>

5. Start the development server
```
npm run dev
```
Open http://localhost:5173 in your browser to view the app.

## License

This project is licensed under the MIT License - see the LICENSE file for details.





