import { NextResponse } from "next/server"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile()

    if (!params.serverId) new NextResponse("Server ID missing", { status: 400 })
    
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    } else {
      const server = await db.server.update({
        where: {
          id: params.serverId,
          profileId: { not: profile.id },
          members: {
            some: {
              profileId: profile.id,
            },
          },
        },
        data: {
          members: {
            deleteMany: {
              profileId: profile.id,
            },
          },
        },
      })

      return NextResponse.json(server)
    }
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
