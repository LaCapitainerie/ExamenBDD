import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProduitForm from "@/components/sections/_components/produit/_form";
import { ProductTable } from "../../components/sections/_components/produit/produit-table";
import { Button } from "@/components/ui/button";
import { InfiniteScrollProduct } from "./_components/infinite-scroll";

export default async function RouterPage() {

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

            
          </div>

          <Dialog>
              <DialogTrigger asChild>
                <Button>Ajouter un avion</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Données de l&apos;avion</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>

                <ProduitForm />
                
              </DialogContent>
            </Dialog>
        </div>

        <InfiniteScrollProduct />

        {/* <ProductTable /> */}

      </div>

    </main>
    
    

  );
}