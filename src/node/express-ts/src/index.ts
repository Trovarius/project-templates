import server from "./server/server"

server.start();

process.on('SIGTERM', () => {
    process.stdout.write('SIGTERM signal received.');
    process.stdout.write('Closing http server.');
    server.close();
});

process.on('SIGKILL', () => {
    process.stdout.write('SIGTERM signal received.');
    process.stdout.write('Closing http server.');
    server.close();
});