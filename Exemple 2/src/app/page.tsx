import { Particles } from "@/components/magicui/particles";
import { siteConfig } from "@/config/config";
import { BentoSection } from "./_components/bento";
import { InfiniteScrollProduct } from "./catalogue/_components/infinite-scroll";

export default async function Home() {

  return (

    <>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <span style={{ lineHeight: "inherit" }} className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          {siteConfig.name}
        </span>
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          refresh />
      </div>
      
      <InfiniteScrollProduct />
    </>

  );
}
