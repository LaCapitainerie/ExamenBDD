import { DataTable } from "@/components/captainui/data-table/data-table";
import { prisma } from "@/lib/prisma";
import { AvionsColumns } from "./_components/columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AvionForm from "@/components/sections/_components/avion/_form";

export default async function RouterPage() {

  const avions = await prisma.avion.findMany({
    include: {
      fournisseurs: true,
    },
  });

  return (
    <main>

      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Catalogue des avions
            </h2>
            <p className="text-muted-foreground">
              Consultez la liste des avions disponibles
            </p>

            <Dialog>
              <DialogTrigger>Ajouter un avion</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Données de l&apos;avion</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>

                <AvionForm />
                
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <DataTable
          columns={AvionsColumns}
          data={avions}
          textFilterColumn={"name"}
          itemName={""}
        />

      </div>

    </main>
    
    

  );
}