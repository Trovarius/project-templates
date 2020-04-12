const p = Deno.run({
  args: [
    "deno",
    "run",
    "--allow-net",
    "--allow-read",
    "--importmap=import-maps.json",
    "./server.ts",
    "./client.ts",
  ],
  stdout: "piped",
  stderr: "piped"
});

// await its completion
await p.status();