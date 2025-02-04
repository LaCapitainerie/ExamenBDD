import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LicenceList } from "@/types/Prisma/Licence";
import { SelectContentProps } from "@radix-ui/react-select";

interface LicenceDropdownProps extends SelectContentProps {
    defaultValue?: string;
}

export function LicenceDropdown({ defaultValue, ...props }: LicenceDropdownProps) {

    return (
        <Select defaultValue={defaultValue}>
            <SelectTrigger className={cn("w-[180px]", props.className)} >
                <SelectValue placeholder="Licence" />
            </SelectTrigger>
            <SelectContent {...props}>
                {
                    LicenceList.map((licence, idx) => (
                        <SelectItem key={idx} value={licence.code}>
                            {licence.name}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}