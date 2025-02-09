"use client";
import React from "react";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { EuroIcon, Loader2, ShoppingCartIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProduits } from "@/hooks/use-avions";
import { Fournisseur, Produit } from "@prisma/client";
import { Button } from "@/components/ui/button";
import useLocalState from "@phntms/use-local-state";
import { toast } from "sonner";

interface DummyProductResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

interface DummyProduct {
  id: number;
  title: string;
  price: string;
}

const Product = ({
  product,
  inCart = false,
  onAddToCart,
}: {
  product: Produit & { fournisseurs: Fournisseur[] };
  inCart: boolean;
  onAddToCart?: (id: string) => void;
}) => {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(product.basePrice);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{formatted}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{product.description}</p>
      </CardContent>
      <CardFooter>
        {inCart ? (
          <Button onClick={() => onAddToCart?.(product.id)}>
            Remove from Cart
            <ShoppingCartIcon />
          </Button>
        ) : (
          <Button onClick={() => onAddToCart?.(product.id)}>
            Add to Cart
            <ShoppingCartIcon />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

function concatN<T>(originalValue: T[], value: T[], deep: number): T[] {
  if (deep === 0) return value;
  return concatN(originalValue, [...originalValue, ...value], deep - 1);
}

type InfiniteScrollProductProps = {};
export function InfiniteScrollProduct({}: InfiniteScrollProductProps) {
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const { avions, isAvionsLoading } = useProduits();
  const pageSize = 3;

  const [value, setValue] = useLocalState("CART", "");

  const onAddToCart = (id: string) => {
    if (value.split(";").includes(id)) {
      setValue(value.replace(`${id};`, ""));
      toast.error("Removed from cart");
    } else {
      setValue(`${value}${id};`);
      toast.success("Added to cart");
    }
  };

  const next = async () => {
    setPage((prev) => prev + 1);

    // if (avions.length <= page * pageSize) {
    //   setHasMore(false);
    // }
  };

  return (
    <div className="max-h-[600px] w-full  overflow-y-auto px-10">
      <div className="grid grid-cols-3 w-full flex-col items-center gap-3">
        {concatN(avions, [], page).map((avion) => (
          <Product
            key={avion.id}
            product={avion}
            inCart={value.split(";").includes(avion.id)}
            onAddToCart={onAddToCart}
          />
        ))}
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={isAvionsLoading}
          next={next}
          threshold={1}
        >
          {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
        </InfiniteScroll>
      </div>
    </div>
  );
}
