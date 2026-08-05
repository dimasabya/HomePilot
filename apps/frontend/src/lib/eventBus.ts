type Client = ReadableStreamDefaultController<Uint8Array>;

const clients = new Set<Client>();

export function addClient(client: Client) {
  clients.add(client);
}

export function removeClient(client: Client) {
  clients.delete(client);
}

export function broadcast(data: unknown) {
  const encoder = new TextEncoder();

  const payload = encoder.encode(`data: ${JSON.stringify(data)}\n\n`);

  for (const client of clients) {
    try {
      client.enqueue(payload);
    } catch {
      clients.delete(client);
    }
  }
}
