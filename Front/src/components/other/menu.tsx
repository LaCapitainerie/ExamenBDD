import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/config/config";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react"

export default function NavigationMenuDemo() {

  const { data: session } = useSession();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {session?.user && siteConfig.header.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.trigger ? (
              <>
                <NavigationMenuTrigger>{item.trigger}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={`grid gap-3 p-6 ${
                      item.content.main
                        ? "md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
                        : "w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                    }`}
                  >
                    {item.content.main && (
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary/10 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href={item.content.main.href}
                          >
                            {item.content.main.icon}
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {item.content.main.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {item.content.main.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    )}
                    {item.content.items.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        href={subItem.href}
                        title={subItem.title}
                        className="hover:bg-primary/10"
                        icon={subItem.icon}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              item.content.main && (
              <Link
                href={item.content.main.href || ""}
                target="_arya"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.content.main.title}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon: React.ElementType;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
            <props.icon className="h-6 w-6 text-primary" />
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
