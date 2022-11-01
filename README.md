# CRUD Template - Mobile Frontend - Expo - Redux Toolkit

This repository is an optional frontend starter for new DALI React projects. Installation and setup instructions are included below. You should eventually customize this README file with project-specific documentation.

## Tech Stack
- [Expo Go](https://expo.dev/client)
- [React Native](https://reactnative.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [axios](https://github.com/axios/axios)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Directory Structure
    .
    ├── ...    
    ├── public
    ├── src                
    │   └── assets             # static assets   
    │   └── components         # reusable components across several screens
    │   └── hooks              # useAppDispatch, useAppSelector
    │   └── navigation         # Defines navigation flow
    │   └── redux              # Redux store and setup
    │   └── screens            # individual pages
    │   └── utils              # utility folder containing helper files
    │     └── styles           # global styles
    ├── tsconfig.json          # TypeScript configuration
    ├── package.json           # npm config
    └── ...

## Setup

1. clone repo and `npm install --legacy-peer-deps`
2. Change `SERVER_URL` endpoint to exact IPv4 address + port
   - You can view your IPv4 address by running `ipconfig` in command terminal
   - If using the [crud-template-backend-postgres](https://github.com/dali-lab/crud-template-backend-postgres), port is `9090`
3. App should be ready for use now
   - `npm start` to run with hot reloading
      - If you are getting "This is taking much longer than it should..." error, try doing `expo start --tunnel` instead. This error happens sometimes when trying to run on Dartmouth eduroam.

#### Redux Debugging

1. Download [react-native-debugger](https://github.com/jhen0409/react-native-debugger/releases) release
2. Run `.exe` file
3. Hook to port 19000

#### Linting

ESLint is set up in this project. To keep code clean, always remember to run `npm run lint` and fix any lint problems before merging into master.

## Authors & Credits
- Eric Lu '25
