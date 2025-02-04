import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import { getSession } from "next-auth/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CustomResponse } from "@/lib/safe-route";

interface DataTableRowDeleteProps {
    id: string;
    onDelete?: () => void;
    url: string;
    itemName: string;
}

export function DataTableRowDelete({ id, onDelete, url, itemName }: DataTableRowDeleteProps) {
    const { toast } = useToast();

    async function deleteRow() {
        try {
            const session = await getSession();

            if (!session || !session.access_token) {
                throw new Error("Unauthorized");
            }

            const result = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${session.access_token}`,
                },
                body: JSON.stringify({ id }),
            });

            const data: CustomResponse<null> = await result.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            toast({
                title: `${itemName.at(0)?.toLocaleUpperCase() + itemName.slice(1)} deleted`,
                description: `${itemName.at(0)?.toLocaleUpperCase() + itemName.slice(1)} has been deleted`,
            })

            onDelete?.();
        } catch (error) {
            
            toast({
                title: `Error deleting ${itemName}`,
                description: `${error}`,
            })
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <TrashIcon color="red" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {itemName}</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to delete this {itemName}?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteRow}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}