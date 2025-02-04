import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagIcon } from "lucide-react";
import { Issue } from "@/types/Prisma/Issue";

interface IssueModalProps {
  defaultValues: Issue;
}

export function IssueModal({ defaultValues }: IssueModalProps) {
    return <>
        <Input placeholder="Issue One" type="text" value={defaultValues.title}/>
            
        <Textarea placeholder="Description de l'issue" className="resize-none" value={defaultValues.description} />
            
            <div className="grid lg:grid-cols-3 gap-4">
                {
                    defaultValues.labels.map((label, index) => (
                        <div key={index} className="flex items-center">
                            <TagIcon className="w-5 h-5 mr-2" color={label.color} />
                            <span>{label.name}</span>
                        </div>
                    ))
                }
                
            </div>
        </>

}