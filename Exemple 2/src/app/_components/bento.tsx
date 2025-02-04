import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { CircleDotIcon, TagIcon, MilestoneIcon, BookTemplateIcon } from "lucide-react";

const BentoValues = [
    {
        Icon: CircleDotIcon,
        name: "Issues",
        description: "View and manage your issues.",
        href: "/issues",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1 lg:row-span-2",
        background: (
            <></>//<DataTableSkeleton columnCount={7}/>
        ),
    },
    {
        Icon: TagIcon,
        name: "Labels",
        description: "Organize your issues with labels.",
        href: "/labels",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <></>//<DataTableSkeleton columnCount={6}/>
        ),
    },
    {
        Icon: BookTemplateIcon,
        name: "Templates",
        description: "Create templates for your project",
        href: "/templates",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1 lg:row-span-2",
        background: (
            <></>//<DataTableSkeleton columnCount={7}/>
        ),
    },
    {
        Icon: MilestoneIcon,
        name: "Milestones",
        description: "Keep track of your project's progress.",
        href: "#milestones",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <></>//<DataTableSkeleton columnCount={6}/>
        ),
    },
];

export function BentoSection() {

    return (
        <BentoGrid className="mt-8 px-8">
            {BentoValues.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
    )
}