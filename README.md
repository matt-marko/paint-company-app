# paint-company-app

This project was created using the [Angular](https://www.angular.io) framework and the [Quarkus](https://www.quarkus.io) framework.

This repository contains both the frontend and backend components.

## Links 

Link to application: https://paint-company-matt.netlify.app/

## Information

This app was developed to satisfy the requirements of _A Paint Company_. It lets users view and edit the availability for each of the five colours of paint they use. When launching the application, the user can log in with different users. By default, John and Painter have view permissions, Jane has edit permissions, and Adam has Admin permissions. 

- A user with view permissions may see the status of all the paints but cannot edit them.

- A user with edit permissions can drag and drop the paints to different columns in order to update their availability. After making changes, press the "Save Changes" button to submit your changes to the server.

- A user with admin permissions may edit the paint statuses too, and they also have access to the "Admin Settings" button which lets them set the roles for the different users.

- A user with disabled permissions is not allowed to log in and view the orders.

## Project Structure

For the frontend, the source code is contained within the `src/app` folder. Within are the following folders:

- The `components` folder contains the Angular UI components.
- The `services` folder contains the Angular services, which are responsible for handling data sent to and from the backend.
- The `environments` folder contains the URLs used to communicate with the backend for both the local and production environments.

For the backend, the source code is contained within the `src/main/java/org/paint` folder. Within are the following classes:

- The `PaintEntity` class contains the structure of the "Paint" object at the database level
- The `PaintResource` class contains the REST endpoints for getting and updating paints. It contains GET, POST, and PUT methods.
- The `UserEntity` class contains the structure of the "User" object at the database level
- The `UserResource` class contains the REST endpoints for getting and updating users and their permissions. It contains GET, POST, and PATCH methods.

## DevOps Pipeline

A CI pipeline exists for this project, which uses GitHub Actions.

For the frontend, it deploys the application to Netlify. The workflow file may be found in `app-frontend/.github/workflows/main.yml`

For the backend, it deploys the application to Heroku. The workflow file may be found in `app-backend/.github/workflows/main.yml`.

## IMPORTANT NOTE

This repository contains the code for both [paint-company-app-backend](https://www.github.com/matt-marko/paint-company-app-backend) and [paint-company-app-frontend](https://www.github.com/matt-marko/paint-company-app-frontend). The pipelines are configured to run only in these two repositories, so the deployments are based off these two repositories as well. This repo is just to show the code for the two components.
