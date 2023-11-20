import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

type ServerIdPageProps = {
  params: {
    serverId: string
  }
}

const ServerIdPage = async ({ params }: ServerIdPageProps) => {
  const profile = await currentProfile()

  if (!profile) redirectToSignIn

  const server = db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile!.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  })

  const initialChannel = server?.channels[0]

  console.log(initialChannel)

  // if (initialChannel?.name !== "general") null

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
}

export default ServerIdPage
