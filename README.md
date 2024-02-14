# GetWin-test

This project is a React application bootstrapped with Create React App. It includes features such as Redux for state management, React Router for routing, and Material-UI for UI components.

## Technologies Used

- React
- Redux Toolkit
- React Router
- Material-UI
- Emotion
- Axios
- TypeScript
- SASS

## Deployment

### Local Deployment

1. Clone this repository to your local machine using `git clone https://github.com/Kh-Ol-An/GetWin-test.git`
2. Navigate to the project directory: `cd GetWin-test`
3. Install dependencies: `npm install`
4. Run the app in development mode: `npm start`
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Online Deployment

This project is deployed online using GitHub Pages.

You can view the deployed project at: [GetWin-test Deployment](https://kh-ol-an.github.io/GetWin-test/)

To deploy the project to GitHub Pages manually:

1. Ensure that the `"homepage"` field in `package.json` points to your GitHub Pages URL.
2. Add `"predeploy": "npm run build"` and `"deploy": "gh-pages -d build"` scripts to your `package.json`.
3. Run `npm run deploy`.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Ejects the app from Create React App's build scripts, allowing you to customize the configuration.

The page will reload if you make edits. You will also see any lint errors in the console.
