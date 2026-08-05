import { addClient, removeClient } from "@/lib/eventBus";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      addClient(controller);

      const encoder = new TextEncoder();

      // kirim event pertama agar koneksi langsung aktif
      controller.enqueue(
        encoder.encode(
          `event: connected\n` +
            `data: ${JSON.stringify({
              connected: true,
            })}\n\n`,
        ),
      );
    },

    cancel(controller) {
      removeClient(controller);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
