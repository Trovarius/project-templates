"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.SERVER_PORT; // default port to listen
// define a route handler for the default home page
app.get("/", (_, res) => {
    res.send("Hello world!");
});
let server;
function start() {
    // start the Express server
    server = app.listen(port, () => {
        process.stdout.write(`server started at http://localhost:${port}`);
    });
}
exports.start = start;
function close(callback) {
    // stop the Express server
    server === null || server === void 0 ? void 0 : server.close(() => {
        process.stdout.write('Http server closed.');
        if (callback)
            callback();
    });
}
exports.close = close;
exports.default = { start, close };
//# sourceMappingURL=server.js.map