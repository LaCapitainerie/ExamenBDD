import { z } from "zod";
import { Row } from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";

type Authorized = z.ZodArray<z.ZodString> | z.ZodString

type StringKeys<T extends z.ZodObject<any>> = {
  [K in keyof T]: T[K] extends Authorized ? K : never
}[keyof T];

interface FileDialogProps<TData, T extends z.ZodObject<any>, K extends StringKeys<T["shape"]>> {
  row: Row<TData>
  imageUrl?: K
  itemSchema: T

  children: React.ReactNode
}

export function FileDialog<TData, T extends z.ZodObject<any>, K extends StringKeys<T["shape"]>>({
  row,
  imageUrl,
  itemSchema,

  children,
}: FileDialogProps<TData, T, K>) {

  return (
    <Dialog>
      <DialogTrigger>Modifier</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details de l&apos;issue</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col sm:flex-row gap-4">

              {
                imageUrl && (
                  <div className="flex-2 flex items-center">
                    <Carousel>
                      <CarouselContent>
                        {itemSchema.parse(row.original)[imageUrl].map((url: string) => (
                          <CarouselItem key={url}>
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">
                                  <img src={url} alt={url} />
                                </span>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))
                        }
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                )
              }


              <div className="flex-1">
                {children}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

}