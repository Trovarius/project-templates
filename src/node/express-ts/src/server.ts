import express from "express";
import dotenv from "dotenv";
import { Server } from "http";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT; // default port to listen

// define a route handler for the default home page
app.get("/", (_, res) => {
  res.send("Hello world!");
});

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