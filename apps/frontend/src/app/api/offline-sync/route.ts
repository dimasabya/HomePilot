import { broadcast } from "@/lib/eventBus";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const command = await req.json();

    console.log("Offline Sync:", command);

    switch (command.action) {
      case "relay-on":
      case "relay-off":
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/devices/${command.deviceId}/relay`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              relay: command.payload.relay,
            }),
          },
        );

        break;
    }

    // broadcast({
    //   type: "relay",

    //   deviceId: command.deviceId,

    //   relay: command.payload.relay,

    //   deviceName: command.deviceName,

    //   updatedAt: Date.now(),
    // });
    broadcast({
      type: "device.updated",

      payload: {
        id: Number(command.deviceId),

        relay: command.payload.relay,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
