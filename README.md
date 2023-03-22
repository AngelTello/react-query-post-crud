# Understanding React Query

This repo is intended to help you understand the main features of React Query and why it changes the way of thinking we have when having async state mixed with client state in a React application.

- [🎉 How to start the app](#-how-to-start-the-app)
  - [🕸 Frontend](#-starting-the-frontend)
  - [🔙 Backend](#-starting-the-backend)
- [✨ Starting point](#-starting-point)

## How to start the app

This repo contains the full stack app - a React app and a json-server to store the data.

### Starting the Frontend

```
npm run start
```

### Starting the Backend

```
npm run jserver
```

## Starting point

The starting point of this exercise is a React app that renders a list of posts. Posts are stored in the "JSON DB" in the backend, and served by `json-server`. The posts are fetched and rendered, and the user can add a new post, edit a post and delete a post.

All of this is done with a regular fetch, wrapped in an `postApi.tsx` file that only exports the methods needed for that CRUD.
