import server from "./server"

server.start();

process.on('SIGTERM', () => {
    process.stdout.write('SIGTERM signal received.');
    process.stdout.write('Closing http server.');
    server.close();
});