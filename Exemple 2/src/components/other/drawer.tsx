import { Icons } from "@/components/other/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/config/config";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";

export default function DrawerDemo() {

  const { data: session } = useSession();

  const content = siteConfig.header[0].content;
  return (
    <Drawer>
      <DrawerTrigger>
        <IoMenuSharp className="text-2xl" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-6">
          <div className="">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              <Icons.logo/>
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>
          </div>
        </DrawerHeader>
        <DrawerFooter>
          {
            session?.user ? (
            
            [content.main, ...content.items].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={buttonVariants({ variant: "outline" })}
              >
                {item.title}
              </Link>
            ))

            ) : (
              <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Connexion
              </Link>
              <Link
                href="/signup"
                className={buttonVariants({ variant: "outline" })}
              >
                Inscription
              </Link>
              </>
            )
          }
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}