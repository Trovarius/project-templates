import { serve } from "@deno/http/server.ts";
import {
  acceptWebSocket,
  WebSocket,
  isWebSocketCloseEvent
} from "@deno/ws/mod.ts";

import { blue, green, red, yellow } from "@deno/fmt/colors.ts";

var port: number = 8080;
async function server(): Promise<void> {
  console.log("Executing function");
  for await (const req of serve(`:${port}`)) {

    const webSocket: WebSocket = await acceptWebSocket({
      conn: req.conn,
      bufWriter: req.w,
      bufReader: req.r,
      headers: req.headers
    });

    const message = webSocket.receive();

    while (true) {
      try {
        const { done, value } = await message.next();
        if (done) {
          break;
        }

        if (typeof value === "string") {
          console.log("ws:Text", value);
          await webSocket.send(value);
        } else if (isWebSocketCloseEvent(value)) {
          // close
          const { code, reason } = value;
          console.log("ws:Close", code, reason);
        } else {
          console.log(yellow("Yo non conosco"));
        }
      } catch (error) {
        console.error(red(`Dammit: ${error}`));
        await webSocket.close(1000).catch(console.error);
      }
    }
  }
}

server();