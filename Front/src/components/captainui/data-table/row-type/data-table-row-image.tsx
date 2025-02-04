import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface DataTableRowFormatImageProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  size?: number
  defaultImage?: string
}

export function DataTableRowFormatImage<TData>({
  value,
  size: size = 100,
  defaultImage: defaultImage = "/default.jpg",
}: DataTableRowFormatImageProps<TData>) {

  return (
    <div className="flex w-[100px] items-center">
      <span className="max-w-[500px] truncate font-medium">
        <Dialog>
          <DialogTrigger>
            <Image
              src={value.startsWith('data:image') ? value : defaultImage}
              alt="Logo"
              width={size}
              height={size}
              onError={(e) => {
              e.currentTarget.src = defaultImage
              }}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Photo de l&apos;élève</DialogTitle>
            <Image
              src={value.startsWith('data:image') ? value : defaultImage}
              alt="Logo"
              width={size * 3}
              height={size * 3}
              onError={(e) => {
              e.currentTarget.src = defaultImage
              }}
            />
          </DialogContent>
        </Dialog>
      </span>
    </div>
  )
}
