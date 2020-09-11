# HighSpot Coding Exercise - ElderScroll Cards Viewer

The ElderScroll Cards Viewer is a web application to view and find ElderScroll Legends cards. It is based on the Elder Scrolls Legends API, a free third-party service built by an independent developer; it is not affiliated with the owner of this repository, or with the intellectual property owners of Elder Scrolls Legends.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of contents

-   [Technologies](#technologies)
-   [Setup](#setup)
-   [Screenshots](#screenshots)
-   [Features](#features)
-   [Production](#production)
-   [To Do](#todo)
-   [Contact](#contact)

## Technologies

-   [Node.js v12.3.1](https://nodejs.org/) javascript runtime using the [Chrome V8 engine](https://v8.dev/)

-   [React v16.13.1](https://reactjs.org/) Frontend javascript library.

-   [Jest](https://https://jestjs.io/)

-   [React Hooks](https://reactjs.org/docs/hooks-overview.html#state-hook)

## Setup

-   Clone this repository and navigate to the root of the repo

*   Run `npm install`

> Installs all dependencies required by the application

-   Run `npm start`

> Runs the frontend in development mode. It will open [http://localhost:3000](http://localhost:3000) to view in browser. Any code changes will automatically reload the browser.

-   Run `npm test` to validate the scenarios of the application

> Launches the test runner in the interactive watch mode.<br />
> See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Screenshots

![ElderScroll Legends Card List](./public/images/ElderScrollsCardList.jpg).

## Features

-   Displays 20 Elder Scroll cards at a time

-   Loads more cards in batches of 20 using infinite scroll

-   Allows searching for cards by name

-   Displays details about each card including Name, Type, Image etc.

## Production

-   `npm run build`

> Builds the app for production to the `build` folder.<br />
> It correctly bundles React in production mode and optimizes the build for the best performance.

> The build is minified and the filenames include the hashes.<br />
> The app is ready to be deployed!

## To Do

-   Loading spinner for first run and search experiences

-   More unit tests to cover core scenarios

-   Error UI for unexpected errors

*   Accessibility

*   Paging or infinite scrolling of search results

*   Default image if card image is missing

*   Background does not fill entire page while searching

## Contact

Please reach out via github.
