# Grazing Earth - Mobile

Expo / React Native application for the Grazing Earth mobile app.

## Tech Stack
- [Expo Go](https://expo.dev/client)
- [React Native](https://reactnative.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [axios](https://github.com/axios/axios)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Designs

[Video of Auth Flow](https://drive.google.com/file/d/1YCM55DrjuRjhGMfjDI_hOMdjj0VTYAs6/view?usp=share_link)

[Video of Primary Usage](https://drive.google.com/file/d/1i1JUlTDhdVu2D3sDVSfA0dYbBYb5zOFN/view?usp=share_link)

Also see the [project's Figma](https://www.figma.com/file/jG7r9xm9YPpl9n1knMEhvN/Grazing-Earth-22F?node-id=204%3A14&t=imGaYR2s9wZ4U1dU-0) for designer HiFis.

Note that you will need to be logged into your DALI account to view these resources.

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
    │   └── styles             # individual styles
    │   └── utils              # utility folder containing helper files
    ├── tsconfig.json          # TypeScript configuration
    ├── package.json           # npm config
    └── ...

## Local Setup

1. clone repo and `yarn install`
   - npm does not install peer dependencies correctly
2. Change `SERVER_URL` endpoint to exact IPv4 address + port
   - You can view your IPv4 address by running `ipconfig` in command terminal
   - Use `4000` for port
3. App should be ready for use now
   - `yarn start` to run with hot reloading
      - If you are getting "This is taking much longer than it should..." error, try doing `expo start --tunnel` instead. This error happens sometimes when trying to run on Dartmouth eduroam.

#### Redux Debugging

1. Download [react-native-debugger](https://github.com/jhen0409/react-native-debugger/releases) release
2. Run `.exe` file
3. Hook to port 19000

#### Linting

ESLint is set up in this project. To keep code clean, always remember to run `yarn run lint` and fix any lint problems before merging into master.

## Deployment

For dev deployment testing, the app is deployed on Expo, under the account `grazing.earth.dev@gmail.com`. Credentials and further instructions can be found in the official Handoff Document.

For user testing, the app is deployed on Testflight, under the account `grazing.earth.dev@gmail.com`. Credentials and further instructions can be found in the official Handoff Document.

### Publishing Updates

Run the following command, **making sure** to replace "1" with a **new, unique** version number (it will not work otherwise):

```eas update --branch dev --message "1"```

This will both update Expo and Testflight.

### Add New User Testers (Testflight)

1. Log into [App Store Connect](https://appstoreconnect.apple.com/) with the credentials as specified in the official Handoff Document.
2. Go to Apps > Grazing Earth > TestFlight > Internal Testing
3. Add the desired email. **However, make sure that the requested email is the one used by that person's Apple ID!**
4. The invited person should receive an email with further instructions.

## Authors & Credits
- Eric Lu '25
