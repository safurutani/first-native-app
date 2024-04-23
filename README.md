# WordSmith
WordSmith is a word game app developed with React Native using TypeScript. You are tasked with creating or 'smithing' as many words as you can from a set of 7 letters. The catch is that one, 'critical' letter must be included in all words.

## Features
- Scoring System: Score points based on word length and complexity
- Instructions: Detailed instructions available in a custom modal component that automatically opens for new players.
- Dynamic User Interface: Experience a fluid UI that updates based on user actions.
- Word Validation: Ensure words are valid, adhere to game rules, and are within our dictionary.
- Game Persistence: Games are saved in an 'Archived Games' tab for users to revisit

## How To Play
- Make as many words as you can from 7 letters
- Choose 7 unique letters, 1 will be the "critical" letter
- Words must include the "critical" letter
- Score points based on how long the words are
- All letters may be used more than once
- Words must be at least 4 letters long
- Words must be in the English dictionary

## Scoring
- 4 letter words are worth 1 point
- Words longer than 4 letters are 1 point per letter
- Words using all 7 letters gain 7 bonus points

Example: ACHILT(**E**)
- LATE = 1 point
- CLEAT = 5 points
- ATHLETE = 7 points
- ATHLETIC = 15 points

## Getting Started
To get started with WordSmith, follow these steps:
1. Clone this repository.
2. Install dependencies using npm install.
3. Run the app using npm start or expo start.

## Technologies Used
- React Native
- Redux
- AsyncStorage
- TypeScript
- [Free Dictionary API](https://dictionaryapi.dev/)
