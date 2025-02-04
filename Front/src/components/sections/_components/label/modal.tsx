import { Input } from "@/components/ui/input";
import { Label } from "@/types/Prisma/Label";

interface LabelModalProps {
    defaultValues: Label;
}

export function LabelModal({ defaultValues }: LabelModalProps) {
    return <>
        <Input placeholder="Label 1" type="text" value={defaultValues.name} disabled/>

        <Input placeholder="Label for bug" type="text" value={defaultValues.description} disabled/>

        <div className="flex items-center gap-2">
            <p>Color :</p>
            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: defaultValues.color }} />
        </div>
    </>

}