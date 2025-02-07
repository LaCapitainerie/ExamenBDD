import { Icons } from "@/components/other/icons";
import { CircleDotIcon } from "lucide-react";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {

  name: "Aviation",
  description: "Gestion des avions",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["SaaS", "Next.js", "React", "Tailwind CSS"],
  links: {
    // email: "mailto:saint-exupery@edu.fr",
    github: "https://github.com/LaCapitainerie/ExamenBdd",
  },
  header: [
    {
      trigger: "Catalogue",
      content: {
        main: {
          icon: <Icons.logo className="w-auto h-[80px] " />,
          title: "Gestion des stocks",
          description: "Gérez vos stocks simplement.",
          href: "/catalogue",
        },
        items: [
          {
            href: "/commande",
            title: "Commande",
            description: "Consultation des commandes",
            icon: CircleDotIcon,
          },
        ],
      },
    },
  ],
  footer: [
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
