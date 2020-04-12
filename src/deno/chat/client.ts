import { connectWebSocket, WebSocket } from "@deno/ws/mod.ts";
import { encode } from "@deno/strings/mod.ts";
import { blue, green, red, yellow } from "@deno/fmt/colors.ts";
import { TextProtoReader } from "@deno/textproto/mod.ts";
import { BufReader, readLines } from "@deno/io/bufio.ts";

const endpoint: string = "ws://127.0.0.1:8080";

async function clientConn(): Promise<void> {

    const client: WebSocket = await connectWebSocket(endpoint);
    console.log("Connected!");

    (async function (): Promise<void> {
        for await (const msg of client.receive()) {
            if (typeof msg === "string") {
                console.log(yellow("< " + msg));
            } else {
                console.log(blue("< Yo non conosco"));
            }
        }
    })();
    const reader = new TextProtoReader(new BufReader(Deno.stdin));

    while (true) {
        await Deno.stdout.write(encode("> "));
    
        const line = await reader.readLine();

        if (line === Deno.EOF || line === "close") {
            console.log(red('Bye!'));
            break;
          } 
        
        await client.send(line);
        
    }
    await client.close(1000);
    Deno.exit(0);
}

clientConn();