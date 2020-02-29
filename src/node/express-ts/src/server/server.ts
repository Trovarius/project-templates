import express from "express";
import dotenv from "dotenv";
import { Server } from "http";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT; // default port to listen

process.stdout.write(__dirname + "../")
app.use("/", express.static(__dirname + "./../")); // serves the index.html

// define a route handler for the default home page
app.get("/api", (_, res) => {
  res.send("Hello world! sdsadadasddssd");
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