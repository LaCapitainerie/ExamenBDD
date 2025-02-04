import Header from "@/components/sections/header";
import { prisma } from "@/lib/prisma";
import { authOption } from "@/routes/plugin@auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Core } from "./_components/core";
import { EnumObject } from "@/components/sections/_components/milestone/facetedFilter";
import { Particles } from "@/components/magicui/particles";
import { Template } from "@/types/Prisma/Template";

export default async function Page() {

  const session = await getServerSession(authOption)

  if (!session || !session.user) {
    redirect('/login')
  }

  const teams = (await prisma.template.findMany({
    where: {
      userRelatedId: session.user.id
    },
    select: {
      title: true,
      description: true,
      public: true,
      licence: true,
      readme: true,
    }
  }) || []) as Template[]

  const readme = (await prisma.readMe.findMany({
    where: {
      userRelatedId: session.user.id
    },
    select: {
      title: true,
    }
  }) || [])

  const issues: EnumObject[] = (await prisma.issue.findMany({
    where: {
      userRelatedId: session.user.id
    },
    select: {
      title: true,
    }
  }) || []).map(i => ({ label: i.title, value: i.title }))

  const milestones: EnumObject[] = (await prisma.milestone.findMany({
    where: {
      userRelatedId: session.user.id
    },
    select: {
      title: true,
    }
  }) || []).map(i => ({ label: i.title, value: i.title }))

  return (
    <>
      <Header user={session.user} />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">

        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
          <Core teams={teams} readme={readme} issues={issues} milestones={milestones} />
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