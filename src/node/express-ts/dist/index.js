"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
server_1.default.start();
process.on('SIGTERM', () => {
    process.stdout.write('SIGTERM signal received.');
    process.stdout.write('Closing http server.');
    server_1.default.close();
});
//# sourceMappingURL=index.js.map