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

  const milestones = (await prisma.milestone.findMany({
    where: {
      userRelatedId: session.user.id
    },
    include: {
      issues: {
        include: {
          labels: true
        }
      }
    }
  }) || [])

  console.log(milestones);

  return (
    <>
      <Header user={session.user} />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">

        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Core
            milestones={milestones}
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