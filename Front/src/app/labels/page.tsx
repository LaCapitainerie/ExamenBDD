import Header from "@/components/sections/header";
import { prisma } from "@/lib/prisma";
import { authOption } from "@/routes/plugin@auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Core } from "./_components/core";
import { Particles } from "@/components/magicui/particles";

export default async function Page() {

  const session = await getServerSession(authOption)

  if (!session || !session.user) {
    redirect('/login')
  }

  const labels = (await prisma.label.findMany({
    where: {
      userRelatedId: session.user.id
    },
    include: {
      issue: true
    }
  }) || [])

  return (
    <>
      <Header user={session.user} />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">

        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Core
            labels={labels}
          />
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            refresh />
        </div>

      </div>
    </>
  )
}