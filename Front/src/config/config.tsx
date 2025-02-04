import { Icons } from "@/components/other/icons";
import { BookDashedIcon, CircleDotIcon, MilestoneIcon, TagIcon } from "lucide-react";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {

  name: "Github-Config",
  description: "Configurez des templates de repository Github.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["SaaS", "Next.js", "React", "Tailwind CSS"],
  links: {
    // email: "mailto:saint-exupery@edu.fr",
    github: "https://github.com/LaCapitainerie/progen",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: Icons.logo,
          title: "Gestion des classes",
          description: "Importer des élèves, des classes et des professeurs.",
          href: "/class",
        },
        items: [
          // {
          //   href: "#",
          //   title: "Téléchargements",
          //   description: "Téléchargez vos rapports simplement.",
          // },
          // {
          //   href: "#",
          //   title: "Mail",
          //   description: "Envoyez vos rapports par mail.",
          // },
        ],
      },
    },
    {
      trigger: "Créer",
      content: {
        items: [
          {
            icon: TagIcon,
            href: "/labels",
            title: "Labels",
            description: "Créez des labels pour vos projets.",
          },
          {
            icon: CircleDotIcon,
            href: "/issues",
            title: "Issues",
            description: "Créez des issues pour vos projets.",
          },
          {
            icon: MilestoneIcon,
            href: "/milestones",
            title: "Milestones",
            description: "Créez des milestones pour vos projets.",
          },
          {
            icon: BookDashedIcon,
            href: "/templates",
            title: "Templates",
            description: "Créez des templates pour vos projets.",
          }
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
