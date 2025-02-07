import { BentoGrid } from "@/components/ui/bento-grid";
import { Core } from "./_components/core";


export default async function Home() {

  return (
    <BentoGrid className="mt-8 px-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Core />
    </BentoGrid>
  )
}
