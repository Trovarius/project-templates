import express from "express";
import dotenv from "dotenv";
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Server } from "http";
import html from "./html";
import App from "../client/App"

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT; // default port to listen

app.use("/", express.static(__dirname + "./../")); // serves the index.html

// define a route handler for the default home page
app.get('/', (_, res) => {
  const body = renderToString(React.createElement(App));

  res.send(
    html({
      body
    })
  );
})

let server:Server;

export function start() {
  // start the Express server
  server = app.listen(port, () => {
    process.stdout.write(`server started at http://localhost:${port}`);
  });
}

export function close(callback?: () => void) {
  // stop the Express server
  server?.close(() => {
    process.stdout.write('Http server closed.');
    if(callback) callback();
  });
}


export default { start, close }